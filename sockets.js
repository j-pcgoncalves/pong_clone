let readyPlayerCount = 0;

function listen (io) {
    const pongNamespace = io.of("/pong");

    pongNamespace.on("connection", (socket) => {
        let room;

        console.log("A user connected", socket.id);

        socket.on("ready", () => {
            room = "Room " + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log("Player ready", socket.id, room);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit("startGame", socket.id);
            }
        });

        socket.on("paddleMove", (paddleData) => {
            socket.to(room).emit("paddleMove", paddleData);
        });

        socket.on("ballMove", (balldata) => {
            socket.to(room).emit("ballMove", balldata);
        });

        socket.on("disconnect", (reasons) => {
            console.log(`Client ${socket.id} disconnected: ${reasons}`);
            socket.leave(room);
        });
    });
}

module.exports = {
    listen,
}