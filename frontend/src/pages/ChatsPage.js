import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  // 🔹 Load matches (chat list)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/match", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMatches(res.data))
      .catch(() => console.log("Failed to load matches"));
  }, [token]);

  // 🔹 Join room + listen for messages
  useEffect(() => {
    if (!activeChat) return;

    const roomId = activeChat.roomId;
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) =>
        prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]
      );
    });

    return () => socket.off("receiveMessage");
  }, [activeChat]);

  // 🔹 Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    socket.emit("sendMessage", {
      roomId: activeChat.roomId,
      senderId: user.id,
      receiverId: activeChat.userId,
      message: input,
    });

    setInput("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex">
      {/* 🔹 Chat List */}
      <div className="w-72 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="px-4 py-3 font-semibold border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
          Chats
        </div>

        <div className="divide-y dark:divide-gray-700">
          {matches.map((m) => (
            <div
              key={m.userId}
              onClick={async () => {
                const roomId = [user.id, m.userId].sort().join("-");
                setActiveChat({ ...m, roomId });
                setMessages([]);

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
              }}
              className={`px-4 py-3 cursor-pointer transition ${
                activeChat?.userId === m.userId
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {m.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {m.matchReason}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Chat Area */}
      <div className="flex-1 flex flex-col">
        {!activeChat ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Select a chat to start messaging
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b dark:border-gray-700 font-semibold text-gray-900 dark:text-gray-100">
              {activeChat.name}
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.senderId === user.id
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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatsPage;
