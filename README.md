# chat-window-web
- A customizable chat window to be integrated into web sites.
- Made with Node.js , socket.io and MongoDB.
- Chat window FAB remains fixed on scroll, can be clicked to open the window and start chatting.
- User is prompted to enter name and email on first visit which is stored in localstorage along with all his chats and is fetched on next visit to continue chat from that point.
- A new chat section is added dynamically in the admin panel whenever a new client connects and if the client is a returning user, his messages are added to his previous chat history.

# Pre-requisites
- MongoDB
- Node.js

# Quick Start
- Clone this repository on your local machine.

- cd to this repository and enter <code>npm install</code> in the terminal to install all dependencies.

- Enter <code>mongo</code> in your terminal and make a collection named chat to store messages and a collection named users to store user details. (not necessary )

- Change the name of the collection in the server.js(9th line onwards) according to the names of your collections.

- Open another terminal, cd to this repo and shoot up a node server by typing <code>node server.js</code> and a python server by typing <code>python-m SimpleHTTPServer</code> (specify the port if required, default is 8080). 

- OPen your browser and go to <code>localhost:8080/chat.html</code> and in another window open <code>localhost:8080/admin-2.html</code>

- User is prompted to enter name and email on first visit which is stored in localstorage, check whether it is being stored or not and messages are being received on the admin panel or not.

- Start chatting and check whether the messages are being communicated properly or not by using <code>db.collection.find()</code> in your mongo  CLI. (replace collection by your collection name, say messages)

- Customize the server.js file to change storage and access methods. (right now , every message is stored as an object with the fields name : 'name of sender', message : 'message content', uid : 'user id', createdOn : 'timestamp')

