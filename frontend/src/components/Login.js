import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Enter email & password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      console.log("Backend response:", response.data);

      
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login Successful 🚀", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      navigate("/dashboard");

    } catch (error) {
      console.log("Login error:", error?.response?.data || error.message);

      toast.error("Invalid Email or Password ❌", {
        style: {
          borderRadius: "10px",
          background: "#ff4d4f",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>EventHub Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="footer-text">Welcome to EventHub 🚀</p>
      </div>
    </div>
  );
}

export default Login;
