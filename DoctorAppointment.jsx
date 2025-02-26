import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor || {};

  // State for form fields
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    address: "",
    mobile: "",
    gender: "Male",
    message: "",
    appointmentDate: "",
  });

  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const appointmentDetails = {
      doctorId: doctor._id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      name: appointmentData.name,
      address: appointmentData.address,
      mobile: appointmentData.mobile,
      gender: appointmentData.gender,
      message: appointmentData.message,
      appointmentDate: appointmentData.appointmentDate,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentDetails),
      });
  
      if (response.ok) {
        alert("Appointment booked successfully!");
        navigate("/"); // Redirect to home page or another page
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  

  return (
    <div className="container mt-4">
      <h3>Book Appointment with {doctor.name || "Doctor"}</h3>
      <p>Specialty: {doctor.specialization || "Unknown"}</p>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={appointmentData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter your address"
            value={appointmentData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            placeholder="Enter mobile number"
            value={appointmentData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Gender:</label>
          <select name="gender" className="form-control" value={appointmentData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            className="form-control"
            value={appointmentData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Message:</label>
          <textarea
            name="message"
            className="form-control"
            rows="3"
            placeholder="Enter your message"
            value={appointmentData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointment;
