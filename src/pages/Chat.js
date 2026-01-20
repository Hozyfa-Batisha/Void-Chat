import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ref, push, onValue, serverTimestamp, off } from "firebase/database";
import { database } from "../firebase";

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const roomName = location.state?.roomName || "Unknown Room";
  
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const username = currentUser?.displayName || 
                   currentUser?.profile?.username || 
                   currentUser?.email?.split('@')[0] || 
                   "Anonymous";

  // Load messages in real-time
  useEffect(() => {
    const messagesRef = ref(database, `chatrooms/${roomName}/messages`);
    
    // Listen for new messages
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by timestamp
        messagesList.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });

    // Cleanup listener on unmount
    return () => off(messagesRef);
  }, [roomName]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track online users
  useEffect(() => {
    const presenceRef = ref(database, `chatrooms/${roomName}/presence/${currentUser.uid}`);
    const usersRef = ref(database, `chatrooms/${roomName}/presence`);

    // Set user as online
    push(presenceRef, {
      username: username,
      timestamp: serverTimestamp()
    });

    // Listen for online users
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.values(data).map(user => 
          Object.values(user)[0]?.username
        ).filter(Boolean);
        setOnlineUsers([...new Set(users)]);
      }
    });

    return () => {
      off(usersRef);
    };
  }, [roomName, currentUser.uid, username]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    const messagesRef = ref(database, `chatrooms/${roomName}/messages`);
    
    try {
      await push(messagesRef, {
        sender: username,
        text: newMsg,
        timestamp: Date.now(),
        userId: currentUser.uid
      });
      setNewMsg("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
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
          <p className="text-sm text-green-300">
            Online: {onlineUsers.length > 0 ? onlineUsers.join(", ") : "Loading..."}
          </p>
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
          messages.map((msg) => (
            <div key={msg.id} className="mb-3 p-2 hover:bg-gray-800 rounded">
              <div className="flex items-baseline gap-2">
                <span className={`font-bold ${msg.userId === currentUser.uid ? 'text-green-500' : 'text-green-300'}`}>
                  {msg.sender}
                  {msg.userId === currentUser.uid && " (You)"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
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