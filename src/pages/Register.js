import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.username || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    // Store username in localStorage
    localStorage.setItem("username", form.username);
    
    console.log("Registered user:", form);
    navigate("/chatroom");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-green-600">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-green-500">
          Register
        </h1>
        <p className="text-sm text-center text-green-300 mb-6">
          Create your account
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full mb-6 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-all duration-200 hover:shadow-lg"
        >
          Register
        </button>

        <p
          className="text-sm mt-4 text-center cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;