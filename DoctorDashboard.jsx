import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // Fetch Appointments from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctor Dashboard</h2>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments scheduled.</p>
      ) : (
        <div className="row">
          {appointments.map((appointment) => (
            <div key={appointment.mobile} className="col-md-6">
              <div className="card p-3 mb-3 shadow border-primary">
                <h5>{appointment.name}</h5>
                <p>
                  <strong>Address:</strong> {appointment.address} <br />
                  <strong>Mobile:</strong> {appointment.mobile} <br />
                  <strong>Gender:</strong> {appointment.gender} <br />
                  <strong>Message:</strong> {appointment.message || "No details"} <br />
                  <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
                  <strong>Status:</strong> 
                  <span className={`badge ${appointment.status === "Completed" ? "bg-success" : "bg-warning"} ms-2`}>
                    {appointment.status || "Pending"}
                  </span>
                </p>
                <button
  className="btn btn-primary"
  onClick={() => {
    if (appointment.mobile) {
      navigate(`/appointment-details/${appointment.mobile}`);
    } else {
      console.error("Mobile number is missing for appointment:", appointment);
    }
  }}
>
  View Details
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
