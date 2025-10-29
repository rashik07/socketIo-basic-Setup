const http = require("http");
const express = require("express");

const {Server} = require("socket.io");


const app = express();
const PORT = process.env.PORT || 9000;
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static("/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
