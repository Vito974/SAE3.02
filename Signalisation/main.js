var WebSocketServer = require('ws').Server;

var socket = new WebSocketServer({port : 9090});

var utilisateurs = {};

socket.on('connection', (connection)=>{
    console.log("l'utilisateur est connecté");

    connection.on('message', ()=>{
        var data;
        // verifie si c'est du json
        try{
            data = JSON.parse(message);
        } catch (e) {
            console.log("Ne supporte que des JSON");
            data = {}
        }

        if (data.type == "login"){
            console.log("Utilisateur en ligne:", data.name);
            
            if(utilisateurs[data.name]){
                sendTo(connection, {
                    type: "login",
                    success: false
                });
            } else {
                utilisateurs[data.name] = connection;
                connection.name = data.name;

                sendTo(connection,{
                    type: "login",
                    success: true
                });
            }

            

        }
    });

    connection.send("Hello from server");
});