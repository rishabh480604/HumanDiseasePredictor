import React from "react";
import { Link } from "react-router-dom";
import "../styles/CheckDisease.css";

const CheckDisease: React.FC = () => {
  return (
    <div className="container">
      {/* Content */}
      <div className="content">
        <div className="patient-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> Emily Johnson</p>
          <p><strong>Age:</strong> 29</p>
          <p><strong>Gender:</strong> Female</p>
          <p><strong>Diagnosis:</strong> Fever, Cough, Fatigue</p>
        </div>

        <div className="predicted-disease">
          <h2>Predicted Disease</h2>
          <p>Based on the provided symptoms, the predicted disease is <strong>Influenza</strong>.</p>
          <p><strong>Recommendation:</strong></p>
          <ul>
            <li>Rest and hydrate well.</li>
            <li>Consult with a healthcare professional if symptoms persist.</li>
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <Link to="/" className="back-btn">Back to Home</Link>
        <Link to="/add-patient" className="add-btn">Add Another Patient</Link>
      </div>
    </div>
  );
};

export default CheckDisease;
