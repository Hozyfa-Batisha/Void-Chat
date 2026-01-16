import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chatroom() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");

  const handleJoin = () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }
    navigate("/chat", { state: { roomName } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md border border-green-600">
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
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors"
        >
          Enter Room
        </button>

        <div className="mt-6 p-4 bg-black border border-green-500 rounded">
          <h3 className="text-lg font-semibold mb-2 text-green-300">Quick Rooms:</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setRoomName("general");
                navigate("/chat", { state: { roomName: "general" } });
              }}
              className="w-full text-left px-4 py-2 bg-gray-800 border border-green-500 rounded hover:bg-green-900 transition-colors"
            >
              # general
            </button>
            <button
              onClick={() => {
                setRoomName("random");
                navigate("/chat", { state: { roomName: "random" } });
              }}
              className="w-full text-left px-4 py-2 bg-gray-800 border border-green-500 rounded hover:bg-green-900 transition-colors"
            >
              # random
            </button>
            <button
              onClick={() => {
                setRoomName("tech");
                navigate("/chat", { state: { roomName: "tech" } });
              }}
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