let readyPlayerCount = 0;

function listen (io) {
    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        socket.on("ready", () => {
            console.log("Player ready", socket.id);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                io.emit("startGame", socket.id);
            }
        });

        socket.on("paddleMove", (paddleData) => {
            socket.broadcast.emit("paddleMove", paddleData);
        });

        socket.on("ballMove", (balldata) => {
            socket.broadcast.emit("ballMove", balldata);
        });

        socket.on("disconnect", (reasons) => {
            console.log(`Client ${socket.id} disconnected: ${reasons}`);
        });
    });
}

module.exports = {
    listen,
}