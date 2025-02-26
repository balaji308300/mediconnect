import React, { useState } from "react";

const AdminDashboard = () => {
  const [doctorData, setDoctorData] = useState({
    doctorId: "",
    name: "",
    specialization: "",
    password: "",
  });

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/add-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Doctor added successfully!");
        setDoctorData({ doctorId: "", name: "", specialization: "", password: "" });
      } else {
        alert(data.message || "Error adding doctor");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard - Add Doctor</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Doctor ID:</label>
          <input
            type="text"
            name="doctorId"
            className="form-control"
            value={doctorData.doctorId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={doctorData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization:</label>
          <input
            type="text"
            name="specialization"
            className="form-control"
            value={doctorData.specialization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={doctorData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Doctor</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
