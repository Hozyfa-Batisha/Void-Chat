import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await register(form.email, form.password, form.username);
      navigate("/chatroom");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-600 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-4 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={loading}
          className="w-full mb-6 px-4 py-2 bg-black border border-green-400 text-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Register"}
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