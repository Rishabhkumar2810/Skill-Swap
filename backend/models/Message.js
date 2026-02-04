const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    roomId: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
