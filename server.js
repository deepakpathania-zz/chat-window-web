var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;
console.log("working");

mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if(err) {
		throw err;
	}
	client.on('connection', function(socket) {
		var col = db.collection('messages');
		var usr = db.collection('users');
		var sendStatus = function(s) {
			socket.emit('status', s);
		};
		
		socket.on("greeting", function(data) {
			console.log(data);
			if (data == "") {
				// new user
				console.log("new user");
				socket.emit("newUserIntro", "Hello! What is your name?");


			} else {
				console.log("return user");
				console.log(typeof data);
				socket.emit("ReturningUser", "Welcome back " + data.name);
				// socket.emit("newEmail" , "Hey " +data.name+ "! What is your mail id ?");		
			}
		});
		col.find().limit(100).sort({_id : 1}).toArray(function(err, res) {
			if(err) throw err;
			// socket.emit('output', res);
		});
		socket.on('newEmail', function(data) {

			console.log(data);
			var email = data.email;
			usr.update({_id: data.id}, {$set: {email : email}}, function(err, res) {
				var userInfo={name : data.name, id: data.id, email :email};
				socket.emit('newEmailResponse', userInfo);
				console.log("inserted");
			
				// socket.emit('output',email);
				// sendStatus({
				// 	message : "Message sent",
				// 	clear : true
				// });
			});
			});

		//wait for input

		socket.on('introMessage', function(data) {
				var name = data.message;
				usr.insert({name : name}, function(err, res) {
				// res = array of inserted items
				var id =res.insertedIds[0];
				var userInfo = {name : name, id : id};
				socket.emit('introMessageResponse', userInfo);
				console.log(id);
				console.log("inserted");
				socket.emit('output',[data]);
				sendStatus({
					message : "Message sent",
					clear : true
				});
			});

		});

		socket.on('input', function(data) {
			var id;
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