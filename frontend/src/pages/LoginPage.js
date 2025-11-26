
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      
      await axios.post(
        "/api/method/login",
        new URLSearchParams({ usr: username, pwd: password }),
        { withCredentials: true } 
      );

      const userRes = await axios.get(
        "/api/method/employee_management_system.api.user_api.get_current_user_info",
        { withCredentials: true }
      );

      const userData = userRes.data.message;
      console.log("Logged user info:", userData);

      localStorage.setItem("authUser", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed! Check username/password or server connection.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
