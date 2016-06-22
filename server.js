var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;
console.log("working");
mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if(err) {
		throw err;
	}
	client.on('connection', function(socket) {
		var col = db.collection('messages');
		var sendStatus = function(s) {
			socket.emit('status', s);
		};
		col.find().limit(100).sort({_id : 1}).toArray(function(err, res) {
			if(err) throw err;
			socket.emit('output', res);

		});
		//wait for input
		socket.on('input', function(data) {
			var name = data.name;
			var message = data.message;
			var time = new Date();
			data.created = time;
			console.log(time);
			whiteSpacePattern = /^\s*$/;
			if(whiteSpacePattern.test(name) || whiteSpacePattern.test(message)) {
				sendStatus("Name and message required");
			}
			else {
			col.insert({name : name, message : message, created : time} , function() {
				console.log("inserted");
				socket.emit('output',[data]);
				sendStatus({
					message : "Message sent",
					clear : true
				});
			});
		}

		})
	});
});