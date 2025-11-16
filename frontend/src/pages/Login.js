import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (ev) => {
  ev.preventDefault();

  try {
    await login(email, password);
    navigate("/", { replace: true });   // Redirect to Employee Page
  } catch (err) {
    alert("Invalid email or password");
  }
};
    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
