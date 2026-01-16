import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-green-500">
      <h1 className="text-5xl font-bold mb-4">VOID CHAT</h1>
      <p className="text-lg mb-8 text-green-400">Enter the digital void...</p>
      
      <div className="space-x-4">
        <button
          className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition-colors font-bold"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition-colors font-bold"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Welcome;