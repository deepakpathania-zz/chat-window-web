# chat-window-web
- A customizable chat window to be integrated into web sites.
- Made with Node.js , socket.io and MongoDB.
- Chat window section remains fixed on scroll, can be clicked to open the window and start chatting.

# Pre-requisites
- MongoDB
- Node.js

# Instrunctions to run
- Clone this repository on your local machine.
- cd to this repository and enter <code>npm install</code> in the terminal to install all dependencies.
- Enter <code>mongo</code> in your terminal and make a collection named chat to store messages(not necessary).
- Open another terminal, cd to this repo and shoot up a server by typing <code>node server.js</code>
- Open the chat.html file either directly or by hosting it on localhost.
- Start chatting and check whether the messages are being communicated properly or not by using <code>db.collection.find()</code> in your mongo  CLI.
- Customize the server.js file to change storage and access methods (Say using localstorage to store chats).
