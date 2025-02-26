import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientDashboard = () => {
  const [patient, setPatient] = useState({
    name: "John Doe",
    profilePic: "https://via.placeholder.com/100", // Placeholder image
  });
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [healthInsights, setHealthInsights] = useState([]);

  // Fetch patient data, appointments, notifications, and health insights
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API endpoints
        const appointmentRes = await axios.get("http://localhost:5000/api/appointments");
        const notificationRes = await axios.get("http://localhost:5000/api/notifications");
        const healthInsightsRes = await axios.get("http://localhost:5000/api/health-insights");

        setAppointments(appointmentRes.data);
        setNotifications(notificationRes.data);
        setHealthInsights(healthInsightsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="card p-4 shadow-sm">
        <div className="d-flex align-items-center">
          <img src={patient.profilePic} alt="Profile" className="rounded-circle me-3" width="70" />
          <div>
            <h4>Welcome, {patient.name}!</h4>
            <p className="text-muted">Your health, our priority.</p>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="row mt-4">
        {/* Upcoming Appointments */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Upcoming Appointments</h5>
            {appointments.length === 0 ? (
              <p className="text-muted">No upcoming appointments</p>
            ) : (
              <ul className="list-group">
                {appointments.slice(0, 3).map((appt, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{appt.doctorName}</strong> - {appt.date} at {appt.time}
                  </li>
                ))}
              </ul>
            )}
            <button className="btn btn-primary mt-2">View All</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Notifications</h5>
            {notifications.length === 0 ? (
              <p className="text-muted">No new notifications</p>
            ) : (
              <ul className="list-group">
                {notifications.slice(0, 3).map((notif, index) => (
                  <li key={index} className="list-group-item">
                    {notif.message}
                  </li>
                ))}
              </ul>
            )}
            <button className="btn btn-primary mt-2">View All</button>
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-4">
        <div className="card p-3 shadow-sm">
          <h5>Health Insights</h5>
          {healthInsights.length === 0 ? (
            <p className="text-muted">No health alerts at the moment</p>
          ) : (
            <ul className="list-group">
              {healthInsights.map((insight, index) => (
                <li key={index} className="list-group-item">{insight.message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
