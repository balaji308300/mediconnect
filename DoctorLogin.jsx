import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/doctor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        navigate("/doctor-dashboard"); // Redirect to Doctor Dashboard
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Doctor ID:</label>
            <input type="text" className="form-control" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
