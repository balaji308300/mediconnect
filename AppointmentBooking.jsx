import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mt-4">
      <h4>Book an Appointment</h4>
      <div className="mt-4">
        <h5>Select a Doctor</h5>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="card p-3 shadow-sm mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{doctor.name}</h6>
                  <p className="text-muted mb-0">{doctor.specialization}</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate(`/doctor-appointment/${doctor._id}`, { state: { doctor } })}
                >
                  Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
