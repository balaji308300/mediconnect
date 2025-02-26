import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/messages"); // Fetch from backend
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointment Notifications</h2>
      <div className="card p-3 shadow-sm">
        {notifications.length === 0 ? (
          <p className="text-muted text-center">No notifications available</p>
        ) : (
          <ul className="list-group">
            {notifications.map((notif, index) => (
              <li key={index} className="list-group-item">
                <h5><strong>{notif.name}</strong> ({notif.gender})</h5>
                <p><strong>Mobile:</strong> {notif.mobile}</p>
                <p><strong>Address:</strong> {notif.address}</p>
                <p><strong>Message:</strong> {notif.message}</p>
                <p><strong>Status:</strong> 
                  <span className={`badge ${notif.status === "Accepted" ? "bg-success" : "bg-danger"}`}>
                    {notif.status}
                  </span>
                </p>
                <small className="text-muted">Appointment Date: {new Date(notif.appointmentDate).toLocaleDateString()}</small><br />
                <small className="text-muted">Notification Date: {new Date(notif.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
