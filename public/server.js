const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// IMPORTANT: serve frontend
app.use(express.static("public"));

// extra safety route for Render
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat", (msg) => {
        io.emit("chat", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on " + PORT);
});
