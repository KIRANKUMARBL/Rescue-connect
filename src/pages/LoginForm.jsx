import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agency"); // default role
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // NOTE: Replace this fake login with your backend call later
    login(email, role);
    localStorage.setItem("user", JSON.stringify({ email, role }));

    // Redirect based on role
    if (role === "admin") navigate("/admin");
    else if (role === "volunteer") navigate("/volunteer");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full shadow flex items-center justify-between px-8 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <span className="text-lg font-bold">RescueConnect</span>
          </div>
          <div className="flex gap-3 items-center">
            <nav className="hidden md:flex gap-6 text-gray-700">
              <a href="/" className="hover:text-blue-500">Home</a>
              <a href="/" className="hover:text-blue-500">About</a>
              <a href="/" className="hover:text-blue-500">Contact</a>
            </nav>

            {/* REGISTER button now navigates to /register */}
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white px-4 py-1 rounded-2xl font-medium hover:bg-blue-600 cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md py-12 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Agency Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 ml-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 ml-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 ml-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
            >
              <option value="agency">Agency</option>
              <option value="admin">Admin</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:scale-102 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-2xl font-medium"
          >
            Login →
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
