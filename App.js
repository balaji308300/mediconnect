import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignupPage from "./signuppage";
import LoginPage from "./LoginPage";
import PatientDashboard from "./patientDashboard";
import AdminLogin from "./AdminLogin"; // Import Admin Login Page
import AdminDashboard from "./AdminDashboard"; // Import Admin Dashboard
import DoctorLogin from "./DoctorLogin";
import DoctorDashboard from "./DoctorDashboard";
import AppointmentBooking from "./AppointmentBooking";
import DoctorAppointment from "./DoctorAppointment";
import AppointmentDetails from "./AppointmentDetails";
import Notifications from "./Notification";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/doctor-appointment/:id" element={<DoctorAppointment />} />
        <Route path="/appointment-details/:mobile" element={<AppointmentDetails />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </Router>
  );
};

export default App;
