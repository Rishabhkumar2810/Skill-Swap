import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
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
