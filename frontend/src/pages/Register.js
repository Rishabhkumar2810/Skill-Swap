import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/auth/register`,   // ✅ production-safe
        { name, email, password }
      );

      alert("Registered successfully ✅");
      navigate("/");
    } catch {
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create Account
        </h2>

        {/* Name */}
        <input
          className="w-full border rounded-lg p-3 mb-3
                     bg-white dark:bg-gray-900
                     border-gray-300 dark:border-gray-700
                     text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 outline-none transition"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          className="w-full border rounded-lg p-3 mb-3
                     bg-white dark:bg-gray-900
                     border-gray-300 dark:border-gray-700
                     text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 outline-none transition"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full border rounded-lg p-3 mb-5
                     bg-white dark:bg-gray-900
                     border-gray-300 dark:border-gray-700
                     text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 outline-none transition"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 active:scale-95 transition"
        >
          Register
        </button>

        {/* Login link */}
        <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
