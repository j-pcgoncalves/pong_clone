const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

io.on("connection", (socket) => {
    console.log("A user connected");
});