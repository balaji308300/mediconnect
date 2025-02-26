import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div
        className="p-5 shadow-lg rounded bg-white text-center d-flex flex-column justify-content-center"
        style={{ width: "100%", maxWidth: "1300px", minHeight: "100vh" }}
      >
        {/* App Name */}
        <h1 className="fw-bold text-primary mb-3">MediConnect</h1>

        {/* Description about MediConnect */}
        <p className="text-muted fs-5">
          <strong>MediConnect</strong> is a modern telemedicine platform that 
          connects <strong>patients</strong> with <strong>doctors</strong> virtually. Schedule appointments, 
          manage prescriptions, and have secure video consultations—all in one place!
        </p>

        {/* Signup & Login Buttons */}
        <div className="d-grid gap-3 mt-4">
          <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>

        {/* Patient & Doctor Section */}
        <div className="mt-4">
          <h4 className="text-dark">Are you a?</h4>
          <div className="d-flex justify-content-around mt-2">
            <button className="btn btn-success btn-lg px-4" onClick={() => navigate("/login?role=patient")}>
              Patient
            </button>
            <button className="btn btn-info btn-lg px-4" onClick={() => navigate("/doctor-login")}>
              Doctor
            </button>
          </div>
        </div>

        {/* Admin Section */}
        <div className="mt-5">
          <h4 className="text-dark">Admin Access</h4>
          <button className="btn btn-danger btn-lg mt-2" onClick={() => navigate("/admin-login")}>
            Admin Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
