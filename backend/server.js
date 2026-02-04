const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Message = require("./models/Message");



// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/match", require("./routes/matchRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Skill Swap API running 🚀");
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        roomId: data.roomId,
        message: data.message,
      });

      // 🔥 NORMALIZED MESSAGE (ObjectId → string)
      io.to(data.roomId).emit("receiveMessage", {
        _id: newMessage._id,
        senderId: newMessage.senderId.toString(),
        receiverId: newMessage.receiverId.toString(),
        roomId: newMessage.roomId,
        message: newMessage.message,
        createdAt: newMessage.createdAt,
      });
    } catch (err) {
      console.error("Message error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
