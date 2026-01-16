import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomName = location.state?.roomName || "Unknown Room";
  const username = localStorage.getItem("username") || "Anonymous";
  
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Load messages from localStorage when component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${roomName}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [roomName]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${roomName}`, JSON.stringify(messages));
    }
  }, [messages, roomName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return;

    const newMessage = {
      sender: username,
      text: newMsg,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setNewMsg("");
  };

  const handleLeave = () => {
    navigate("/chatroom");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-green-600">
        <div>
          <h1 className="text-3xl font-bold">Room: #{roomName}</h1>
          <p className="text-sm text-green-300">Logged in as: {username}</p>
        </div>
        <button
          onClick={handleLeave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors font-bold"
        >
          Leave Room
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 w-full bg-gray-900 border border-green-600 rounded-lg p-4 mb-4 overflow-y-auto max-h-[calc(100vh-250px)]">
        {messages.length === 0 ? (
          <p className="text-center text-green-300 mt-10">
            No messages yet. Start the conversation! 💬
          </p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-3 p-2 hover:bg-gray-800 rounded">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-green-300">{msg.sender}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <div className="text-green-400 ml-4 mt-1">{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="w-full flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 bg-black border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-green-400"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 rounded transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;