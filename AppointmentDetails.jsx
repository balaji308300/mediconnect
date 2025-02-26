import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AppointmentDetails = () => {
  const { mobile } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // Fetch appointment details by mobile
  useEffect(() => {
    console.log("Mobile parameter:", mobile); // Debugging

    const fetchAppointment = async () => {
      if (!mobile) {
        console.error("Mobile number is undefined!");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/mobile/${mobile}`);
        console.log("API Response Data:", response.data); // Debugging

        setAppointment(response.data);
        setStatus(response.data.status || "Accepted"); // Default to "Accepted"
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [mobile]);

  // Handle status update
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      console.log(`Updating status to: ${newStatus}`); // Debugging

      await axios.put(`http://localhost:5000/api/appointments/${appointment._id}`, { status: newStatus });
      setStatus(newStatus);
      alert(`Appointment marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle sending message and storing all details in a separate MongoDB collection
  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty!");
      return;
    }

    const recordData = {
      name: appointment.name,
      address: appointment.address,
      mobile: appointment.mobile,
      gender: appointment.gender,
      message: message, // User's message
      status: status,
      appointmentDate: appointment.appointmentDate,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/messages", recordData);
      console.log("Stored Message Response:", response.data); // Debugging

      alert("Message and appointment details stored successfully!");
      setMessage(""); // Clear message after sending
    } catch (error) {
      console.error("Error storing message and details:", error);
    }
  };

  if (!appointment) {
    return <div className="text-center mt-5">Loading appointment details...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointment Details</h2>

      <div className="row">
        {/* Patient Details Card */}
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Patient Details</h5>
            <p>
              <strong>Name:</strong> {appointment.name} <br />
              <strong>Address:</strong> {appointment.address} <br />
              <strong>Mobile:</strong> {appointment.mobile} <br />
              <strong>Gender:</strong> {appointment.gender} <br />
              <strong>Message:</strong> {appointment.message} <br />
              <strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
              <strong>Status:</strong>{" "}
              <select
                className="form-select d-inline w-auto"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </p>
          </div>
        </div>

        {/* Medical Records Card */}
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Patient Medical Records</h5>
            <p>No records available. (Future: Add Prescription & Reports)</p>
          </div>
        </div>
      </div>

      {/* Secure Chat */}
      <div className="card mt-4 p-3 shadow">
        <h5>Chat with Patient</h5>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
 