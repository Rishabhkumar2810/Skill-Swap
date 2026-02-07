import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
);

}

export default Login;
