import React, { ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import "../styles/CheckDisease.css";
import { useState } from "react";
import axios from "axios";

const CheckDisease: React.FC = () => {
  const [patient,setPatient]=useState({
    name:'abcdef',
    age:'31',
    gender:'Male',
    symptoms:["a","b","c","d","e","f"],
    predicted:["z","x","c"],
  });
  function handleChange(e : React.ChangeEvent<HTMLInputElement>){
    setPatientId(e.target.value);
  }

  const [havePatient,setHavePatient]=useState<boolean>(false)
  const [patientId,setPatientId]=useState<string>('');


  async function handleSearch(){
    const response=await axios.get(`http://127.0.0.1:5000/searchPatient/${patientId}`);
    if(response.status=200){
      // console.log(response.data);
      setPatient(response.data.patientData);
      setHavePatient(true);
      alert(response.data.message);

    }else{
      alert(response.data.message);
    }

  }
 
  if(!havePatient){
    return (
      <div id='container'>
      
      <br/>
      <label htmlFor="patientId">Patient ID</label>
      <input
        type="text"
        id="inputSearch"
        name="patientId"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={handleChange}
        required
      />
      <button id='searchButon' onClick={handleSearch}>Search</button>
      

      </div>
    );
  }
  return (
    <div className="container">
      {/* Content */}
      <div className="content">
        <div className="patient-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {patient.name} </p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Symptom:</strong></p>
          <p>{'\t'}{patient.symptoms[0]}</p>
          <p>{'\t'}{patient.symptoms[1]}</p>
          <p>{'\t'}{patient.symptoms[2]}</p>
          <p>{'\t'}{patient.symptoms[3]}</p>
          <p>{'\t'}{patient.symptoms[4]}</p>
        </div>

        <div className="predicted-disease">
          <h2>Predicted Disease</h2>
          <p>Based on the provided symptoms, the predicted disease by <strong></strong>.</p>
          <p><strong>decisionTreeResult:</strong></p>
          <p>{'\t'}{patient.predicted[0]}</p>
          <p><strong>randomForestResult:</strong></p>
          <p>{'\t'}{patient.predicted[1]}</p>
          <p><strong>naiveBayesResult:</strong></p>
          <p>{'\t'}{patient.predicted[2]}</p>

          {/*
          <p><strong>Recommendation:</strong></p>
          <ul>
            <li>Rest and hydrate well.</li>
            <li>Consult with a healthcare professional if symptoms persist.</li>
  </ul>*/}
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
