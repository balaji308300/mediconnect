import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
        alert("Login successful!");
        navigate("/patient-dashboard"); // Redirect
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-3">
              <label>Email:</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
