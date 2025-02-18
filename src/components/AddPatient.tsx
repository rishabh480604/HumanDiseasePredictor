import { useState } from "react";
import "../styles/AddPatient.css";

const AddPatient: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: ["", "", "", ""], 
    testResults: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    if (index !== undefined) {
      // Update symptoms array based on index
      const updatedSymptoms = [...formData.symptoms];
      updatedSymptoms[index] = e.target.value;
      setFormData({ ...formData, symptoms: updatedSymptoms });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <select name="age" value={formData.age} onChange={handleChange} required>
          <option value="">Select Age</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label>Gender</label>
        <div className="gender">
          <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
        </div>

        <label>Symptoms</label>
        {formData.symptoms.map((symptom, index) => (
          <input
            key={index}
            type="text"
            name={`symptom${index}`}
            placeholder={`Describe symptom ${index + 1}`}
            value={symptom}
            onChange={(e) => handleChange(e, index)}
            required
          />
        ))}

        <label>Diagnostic Test Results</label>
        <input
          type="text"
          name="testResults"
          placeholder="Enter test results"
          value={formData.testResults}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
