const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
    x: 200,
    y: 200
};

var players = {
    X: 'tt',
    O: 'pp'
}

Socketio.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });



    socket.on("results", data => {
        Socketio.emit("scores", data);
    });

    
    socket.on("players", data => {
        players = data;
        Socketio.emit("playersback", data);
    });
     
    socket.on("playerName", index => {
        let name = players[index];
        Socketio.emit('playerNameBack', name)
    })

});

Http.listen(3000, () => {
    console.log("Listening at :3000..");
});