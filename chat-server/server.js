const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend
app.use(express.static("public"));

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* =========================
   MESSAGE SCHEMA
========================= */
const MessageSchema = new mongoose.Schema({
  user: { type: String, default: "User" },
  text: String,
  time: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", MessageSchema);

/* =========================
   SOCKET CHAT LOGIC
========================= */
io.on("connection", async (socket) => {
  console.log("User connected");

  // Load last messages
  try {
    const messages = await Message.find()
      .sort({ time: 1 })
      .limit(50);

    socket.emit("loadMessages", messages);
  } catch (err) {
    console.log("Load error:", err);
  }

  // Receive + save message
  socket.on("chat", async (msg) => {
    try {
      const newMsg = new Message({
        user: "User",
        text: msg
      });

      await newMsg.save();

      io.emit("chat", {
        user: "User",
        text: msg
      });

    } catch (err) {
      console.log("Save error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
