import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Chatroom() {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [roomName, setRoomName] = useState("");

  console.log("Current User Object:", currentUser);
  console.log("Display Name:", currentUser?.displayName);
  console.log("Profile:", currentUser?.profile);
  console.log("Email:", currentUser?.email);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  const handleJoin = () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }
    navigate("/chat", { state: { roomName } });
  };

  // Get username from multiple sources
  const username = currentUser?.displayName ||
    currentUser?.profile?.username ||
    currentUser?.email?.split('@')[0] ||
    "User";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md border border-green-600">

        {/* User Info Header */}
        <div className="mb-6 pb-4 border-b border-green-600 flex justify-between items-center">
          <div>
            <p className="text-xs text-green-300">Logged in as:</p>
            <p className="font-bold text-lg">{username}</p>
            <p className="text-xs text-gray-400">{currentUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-semibold"
          >
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Join or Create Chatroom</h2>

        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          className="w-full mb-6 px-4 py-2 bg-black border border-green-500 rounded focus:outline-none text-green-400"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors mb-6"
        >
          Enter Room
        </button>

        <div className="p-4 bg-black border border-green-500 rounded">
          <h3 className="text-lg font-semibold mb-3 text-green-300">Quick Rooms:</h3>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/chat", { state: { roomName: "general" } })}
              className="w-full text-left px-4 py-2 bg-gray-800 border border-green-500 rounded hover:bg-green-900 transition-colors"
            >
              # general
            </button>
            <button
              onClick={() => navigate("/chat", { state: { roomName: "random" } })}
              className="w-full text-left px-4 py-2 bg-gray-800 border border-green-500 rounded hover:bg-green-900 transition-colors"
            >
              # random
            </button>
            <button
              onClick={() => navigate("/chat", { state: { roomName: "tech" } })}
              className="w-full text-left px-4 py-2 bg-gray-800 border border-green-500 rounded hover:bg-green-900 transition-colors"
            >
              # tech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;