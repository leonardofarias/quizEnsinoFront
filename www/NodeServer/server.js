//require our websocket library
var WebSocketServer = require('ws').Server;

//creating a websocket server at port 55000
var wss = new WebSocketServer({port: 55000});

//all connected to the server users
var users = {};
var list = [];
var check = {};

//when a user connects to our sever
wss.on('connection', function(connection) {

   console.log("User connected");

   //when server gets a message from a connected user
   connection.on('message', function(message) {

      var data;
      //accepting only JSON messages
      try {
         data = JSON.parse(message);
      } catch (e) {
         console.log("Invalid JSON");
         data = {};
      }

      console.log(data);
      //switching type of the user message
      switch (data.type) {

          //when a user tries to login
         case "login":
            console.log("User logged", data.name);

         
            //if anyone is logged in with this username then refuse
            /*if(users[data.name]) {

              sendTo(connection, {
                type: "login",
                success: false,
                list: list
              });
            } else { */
               //save user connection on the server
              users[data.name] = connection;
              connection.name = data.name;
              var teste = false;
              if(list.length == 0)
              list.push(data.name);

              for (var i = 0; i < list.length; i++) {
                if(list[i] == data.name){
                  teste = true;
                  continue;
                }
              };

              if(teste){
                console.log('ja tem')
              }else{
                console.log('add');
                list.push(data.name);
              }
              sendTo(connection, {
                type: "login",
                success: true,
                name: connection.name,
                list: list
              });
            //}

            break;

         case "offer":
            //for ex. UserA wants to call UserB
            console.log("Sending offer to: ", data.name);

            //if UserB exists then send him offer details
            var conn = users[data.name];
            console.log(conn);

            if(conn != null) {
               //setting that UserA connected with UserB
               connection.otherName = data.name;

               sendTo(conn, {
                  type: "offer",
                  offer: data.offer,
                  name: connection.name
               });
            }

            break;

         case "answer":
            console.log("Sending answer to: ", data.name);
            //console.log(data);
            //for ex. UserB answers UserA
            var conn = users[data.name];

            if(conn != null) {
               connection.otherName = data.name;
               if(data.accept){
                 sendTo(conn, {
                    type: "answer",
                    answer: data.answer,
                    check: true,
                    name : data.nameAdv
                 });
               }else{
                 sendTo(conn, {
                    type: "answer",
                    answer: data.answer,
                    check: false
                 });
              }
            }
            break;

         case "candidate":
            console.log("Sending candidate to:",data.name);
            var conn = users[data.name];

            if(conn != null) {
               sendTo(conn, {
                  type: "candidate",
                  candidate: data.candidate
               });
            }

            break;

         case "leave":
            console.log("Disconnecting from", data.name);
            var conn = users[data.name];
            conn.otherName = null;

            //notify the other user so he can disconnect his peer connection
            if(conn != null) {
               sendTo(conn, {
                  type: "leave"
               });
            }

            break;

         default:
            sendTo(connection, {
               type: "error",
               message: "Command not found: " + data.type
            });

            break;
      }
   });

   //when user exits, for example closes a browser window
   //this may help if we are still in "offer","answer" or "candidate" state
   connection.on("close", function() {

      if(connection.name) {
      delete users[connection.name];

         if(connection.otherName) {
            console.log("Disconnecting from ", connection.otherName);
            var conn = users[connection.otherName];
            conn.otherName = null;

            if(conn != null) {
               sendTo(conn, {
                  type: "leave"
               });
            }
         }
      }
   });
   connection.send("Hello world");
});

function sendTo(connection, message) {
   connection.send(JSON.stringify(message));
}
