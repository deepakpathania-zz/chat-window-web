var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;
var ObjectId = require('mongodb').ObjectID;
console.log("working");	
var admin;
var clients = {};

var hashed_string = "1c4a81692da3391b57ba6c5afdf11f46";
mongo.connect('mongodb://127.0.0.1/chat', function(err, db){ //change collection name from chat to your collection name
	if(err) {
		throw err;
	}
	client.on('connection', function(socket) { //connect to collections on connection
		var col = db.collection('messages');
		var usr = db.collection('users');
		var sendStatus = function(s) {
			socket.emit('status', s);
		};
		socket.on("greeting", function(data) {
			console.log(data);
			if (data == "") 
			{
				// new user
				console.log("new user");
				socket.emit("newUserIntro", "Hello! What is your name?");
			} 
			else 
			{
				//returning user
				console.log("return user");
				socket.emit("ReturningUser", "Welcome back " + data.name);	
			}
		});
		socket.on(hashed_string, function(data) {
			admin = socket;
			admin.on('newAdminMessage', function(data) {
				console.log("admin response");
				var clientid = data.id;
				console.log(clients);
				clients[clientid].emit('newAdminMessageResponse', data);
			});
		});
		
		col.find().limit(100).sort({_id : 1}).toArray(function(err, res) {  //get previous 100 chat messages from collection
			if(err) throw err;
		});
		socket.on('newEmail', function(data) {
		console.log(data);
		console.log("Email test");
		function validateEmail(email) {
    		if (email.length == 0) return false;
    		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    		return re.test(email);
			}
			var email = data.email;
			
			if (validateEmail(email)) { 
				console.log('Valid email address'); 
				console.log("updating email in db");
				usr.update({_id: ObjectId(data.id)}, {$set: {email : email}}, function(err, res) {
					var userInfo={name : data.name, id: data.id, email :email};
					if(admin==undefined) {
					console.log("admin connect not working")
					socket.emit('newEmailResponse', userInfo);
					}
					else {
						clients[data.id] = socket;
						console.log("adminConnect Working");
						admin.emit("adminConnect", userInfo);
					}
					console.log("inserted");
					sendStatus({
						message : "Message sent",
						clear : true
					});

				});

			}
			else {
				console.log('wrong email address');
				var userInfo={name : data.name, id: data.id, email :email};
				socket.emit('wrongEmailResponse', userInfo);
				sendStatus({
						message : "Message sent",
						clear : true
					});
				}
			});

		socket.on('introMessage', function(data) { //user entered his name
				var name = data.message;
				usr.insert({name : name}, function(err, res) {
				// res = array of inserted items
				var id =res.insertedIds[0];
				var userInfo = {name : name, id : id};
				socket.emit('introMessageResponse', userInfo);
				console.log(id);
				console.log("inserted");
				sendStatus({
					message : "Message sent",
					clear : true
				});
			});

		});

		socket.on('input', function(data) { //user entered normal chat message
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
				col.insert({name : name, message : message, created : time} , function() { //insert chat messaged in db
				console.log("inserted");
				socket.emit('output',data);
				sendStatus({
					message : "Message sent",
					clear : true
				});
			});
		}

		})
	});
});