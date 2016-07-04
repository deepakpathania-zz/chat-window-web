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

- OPen your browser and go to <code>localhost:8080/chat.html</code> and in another window open <code>localhost:8080/admin-2.html</code>

- User is prompted to enter name and email on first visit which is stored in localstorage, check whether it is being stored or not and messages are being received on the admin panel or not.

- Start chatting and check whether the messages are being communicated properly or not by using <code>db.collection.find()</code> in your mongo  CLI. (replace collection by your collection name, say messages)

- Customize the server.js file to change storage and access methods. (right now , every message is stored as an object with the fields name : 'name of sender', message : 'message content', uid : 'user id', createdOn : 'timestamp')

# Demo screenshots
- After you have successfully followed the steps mentioned above, you should see a FAB at the address <code>localhost:8000/chat.html</code> like this.

![demo_1](https://cloud.githubusercontent.com/assets/15071438/16545916/682017a4-4156-11e6-9ea8-8ec4c53371c8.png)


- Click on the FAB to open a chat window. For first time users, it asks your name and email (even validates the email and prompts you to enter again if wrong) and stores that data in localstorage, to be fetched again in case of returning users.
It connects you to an admin if someone is online from the admin panel(checked by emitting a unique hashed string from admin account) or simply prompts you to leave your message if admin is offline.


![demo_2](https://cloud.githubusercontent.com/assets/15071438/16545915/681f94a0-4156-11e6-9d04-b29a8a599c8d.png)
![demo_3](https://cloud.githubusercontent.com/assets/15071438/16545917/6823f018-4156-11e6-9eae-b64461eb1bc1.png)
![demo_4](https://cloud.githubusercontent.com/assets/15071438/16545919/682a2104-4156-11e6-852c-f76e6ee97d86.png)
![demo_5](https://cloud.githubusercontent.com/assets/15071438/16545918/68293e7e-4156-11e6-9f69-a04b4711676f.png)
![demo_7](https://cloud.githubusercontent.com/assets/15071438/16545921/68516714-4156-11e6-9785-999a438bb624.png)

- Every time a new client is added, his name and chat history div is added dynamically to the client list. For returning users, the message is sent to the existing chat history div. The admin can switch among chats simply by clicking on the names of the clients in the client list.


![demo_6](https://cloud.githubusercontent.com/assets/15071438/16545920/683245be-4156-11e6-9d44-230f69021a7c.png)
![demo_8](https://cloud.githubusercontent.com/assets/15071438/16545922/6855848e-4156-11e6-86cb-ce77632ccc26.png)


- All of the messages and the user information is stored in localstorage on the client end to recognize returning users and fetch their older messages. On the admin end, the messages are fetched directly from the database by making use of client id to recognize the messages of different clients.


![demo_9](https://cloud.githubusercontent.com/assets/15071438/16545923/685c31e4-4156-11e6-9ab4-d24ce57b8aaf.png)
