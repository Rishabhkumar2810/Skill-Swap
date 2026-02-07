import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Chat() {
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const roomId =
    currentUser.id < userId
      ? `${currentUser.id}-${userId}`
      : `${userId}-${currentUser.id}`;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // 🔹 Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch {
        console.log("Failed to load chat history");
      }
    };

    loadHistory();
  }, [roomId, token]);

  // 🔹 Socket logic
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) =>
        prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]
      );
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  // 🔹 Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      senderId: currentUser.id,
      receiverId: userId,
      message,
    });

    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-100">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.senderId === currentUser.id
                ? "ml-auto bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 border dark:border-gray-600 text-gray-900 dark:text-gray-100"
            }`}
          >
            <div>{msg.message}</div>
            <div className="text-xs opacity-70 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-800">
        <input
          className="flex-1 border rounded-lg px-4 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
