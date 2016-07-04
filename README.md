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

- Open another terminal, cd to this repo and shoot up a node server by typing <code>node server.js</code> and a python server by typing <code>python-m SimpleHTTPServer</code> (specify the port if required, default is 8000). 

- Open your browser and go to <code>localhost:8080/chat.html</code> and in another window open <code>localhost:8080/admin-2.html</code>

- User is prompted to enter name and email on first visit which is stored in localstorage, check whether it is being stored or not and messages are being received on the admin panel or not.

- Start chatting and check whether the messages are being communicated properly or not by using <code>db.collection.find()</code> in your mongo  CLI. (replace collection by your collection name, say messages)

- Customize the server.js file to change storage and access methods. (right now , every message is stored as an object with the fields name : 'name of sender', message : 'message content', uid : 'user id', createdOn : 'timestamp')

# Demo screenshots
- After you have successfully followed the steps mentioned above, you should see a FAB at the address <code>localhost:8000/chat.html</code> like this.


![demo1](https://cloud.githubusercontent.com/assets/15071438/16568206/04f2beee-4245-11e6-990b-e600d93e62ab.png)



- Click on the FAB to open a chat window. For first time users, it asks your name and email (even validates the email and prompts you to enter again if wrong).
It connects you to an admin if someone is online from the admin panel(checked by emitting a unique hashed string from admin account) or simply prompts you to leave your message if admin is offline.



![demo2](https://cloud.githubusercontent.com/assets/15071438/16568207/04f7e8b0-4245-11e6-83db-ab421ee858fd.png)
![demo3](https://cloud.githubusercontent.com/assets/15071438/16568208/04f8d806-4245-11e6-966d-67b146a7c4cd.png)
![demo4](https://cloud.githubusercontent.com/assets/15071438/16568209/04fd9d78-4245-11e6-86c9-20b5dc7bfcf0.png)
![demo5](https://cloud.githubusercontent.com/assets/15071438/16568211/05060ff8-4245-11e6-93fc-80b659432454.png)


- Every time a new client is added, his name and chat history div is added dynamically to the client list. For returning users, the message is sent to the existing chat history div. The admin can switch among chats simply by clicking on the names of the clients in the client list.


![demo7](https://cloud.githubusercontent.com/assets/15071438/16568212/05260574-4245-11e6-8bf0-056ef653c969.png)
![demo8](https://cloud.githubusercontent.com/assets/15071438/16568213/052dee4c-4245-11e6-9b4a-5fc62efec05b.png)



- All of the messages and the user information is stored in localstorage on the client end to recognize returning users and fetch their older messages. On the admin end, the messages are fetched directly from the database by making use of client id to recognize the messages of different clients.


![demo6](https://cloud.githubusercontent.com/assets/15071438/16568210/0505665c-4245-11e6-9c8e-b141d0cfb4e1.png)
![demo9](https://cloud.githubusercontent.com/assets/15071438/16568214/0538c3d0-4245-11e6-8515-fdbfcea5aa36.png)
<<<<<<< HEAD

=======
>>>>>>> 9291f2584dc426be05d31c16d6221e01ee736d6d
