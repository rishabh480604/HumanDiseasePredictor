import React from "react";
import './../styles/CheckDisease.css'
import { Link, useParams } from "react-router-dom";

// Doctor records mapped by disease
const staffRecord: Record<string, {
  doctor1: string;
  speciality1: string;
  mobNo1: string;
  doctor2: string;
  speciality2: string;
  mobNo2: string;
}> = {
  "Fungal infection": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Dermatology",
    mobNo1: "+91 9876543211",
    doctor2: "Dr. Arjun Patel",
    speciality2: "General Physician",
    mobNo2: "+91 9123456781",
  },
  "Allergy": {
    doctor1: "Dr. Anjali Verma",
    speciality1: "Allergist",
    mobNo1: "+91 9876543212",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "General Physician",
    mobNo2: "+91 9123456782",
  },
  "GERD": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Gastroenterology",
    mobNo1: "+91 9876543213",
    doctor2: "Dr. Karan Singh",
    speciality2: "General Physician",
    mobNo2: "+91 9123456783",
  },
  "Chronic cholestasis": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543214",
    doctor2: "Dr. Rohit Gupta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456784",
  },
  "Drug Reaction": {
    doctor1: "Dr. Ananya Roy",
    speciality1: "Internal Medicine",
    mobNo1: "+91 9876543215",
    doctor2: "Dr. Vikram Joshi",
    speciality2: "Allergist",
    mobNo2: "+91 9123456785",
  },
  "Peptic ulcer disease": {
    doctor1: "Dr. Sunil Desai",
    speciality1: "Gastroenterology",
    mobNo1: "+91 9876543216",
    doctor2: "Dr. Meera Sharma",
    speciality2: "General Physician",
    mobNo2: "+91 9123456786",
  },
  "AIDS": {
    doctor1: "Dr. Arjun Patel",
    speciality1: "Infectious Diseases",
    mobNo1: "+91 9876543217",
    doctor2: "Dr. Priya Mehta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456787",
  },
  "Diabetes": {
    doctor1: "Dr. Karan Singh",
    speciality1: "Endocrinology",
    mobNo1: "+91 9876543218",
    doctor2: "Dr. Anjali Verma",
    speciality2: "General Physician",
    mobNo2: "+91 9123456788",
  },
  "Gastroenteritis": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Gastroenterology",
    mobNo1: "+91 9876543219",
    doctor2: "Dr. Rohit Gupta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456789",
  },
  "Bronchial Asthma": {
    doctor1: "Dr. Rajesh Kumar",
    speciality1: "Pulmonology",
    mobNo1: "+91 9876543220",
    doctor2: "Dr. Ananya Roy",
    speciality2: "General Physician",
    mobNo2: "+91 9123456790",
  },
  "Hypertension": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Cardiology",
    mobNo1: "+91 9876543221",
    doctor2: "Dr. Karan Singh",
    speciality2: "General Physician",
    mobNo2: "+91 9123456791",
  },
  "Migraine": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Neurology",
    mobNo1: "+91 9876543222",
    doctor2: "Dr. Sunil Desai",
    speciality2: "General Physician",
    mobNo2: "+91 9123456792",
  },
  "Cervical spondylosis": {
    doctor1: "Dr. Arjun Patel",
    speciality1: "Orthopedics",
    mobNo1: "+91 9876543223",
    doctor2: "Dr. Rohit Gupta",
    speciality2: "Physiotherapy",
    mobNo2: "+91 9123456793",
  },
  "Paralysis (brain hemorrhage)": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Neurology",
    mobNo1: "+91 9876543224",
    doctor2: "Dr. Anjali Verma",
    speciality2: "Rehabilitation",
    mobNo2: "+91 9123456794",
  },
  "Jaundice": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543225",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "General Physician",
    mobNo2: "+91 9123456795",
  },
  "Malaria": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Infectious Diseases",
    mobNo1: "+91 9876543226",
    doctor2: "Dr. Vikram Joshi",
    speciality2: "General Physician",
    mobNo2: "+91 9123456796",
  },
  "Chicken pox": {
    doctor1: "Dr. Sunil Desai",
    speciality1: "Dermatology",
    mobNo1: "+91 9876543227",
    doctor2: "Dr. Arjun Patel",
    speciality2: "Pediatrics",
    mobNo2: "+91 9123456797",
  },
  "Dengue": {
    doctor1: "Dr. Ananya Roy",
    speciality1: "Internal Medicine",
    mobNo1: "+91 9876543228",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "General Physician",
    mobNo2: "+91 9123456798",
  },
  "Typhoid": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Infectious Diseases",
    mobNo1: "+91 9876543229",
    doctor2: "Dr. Sunita Rao",
    speciality2: "General Physician",
    mobNo2: "+91 9123456799",
  },
  "hepatitis A": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543230",
    doctor2: "Dr. Rohit Gupta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456800",
  },
  "Hepatitis B": {
    doctor1: "Dr. Arjun Patel",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543231",
    doctor2: "Dr. Karan Singh",
    speciality2: "General Physician",
    mobNo2: "+91 9123456801",
  },
  "Hepatitis C": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543232",
    doctor2: "Dr. Anjali Verma",
    speciality2: "General Physician",
    mobNo2: "+91 9123456802",
  },
  "Hepatitis D": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543233",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "General Physician",
    mobNo2: "+91 9123456803",
  },
  "Hepatitis E": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543234",
    doctor2: "Dr. Arjun Patel",
    speciality2: "General Physician",
    mobNo2: "+91 9123456804",
  },
  "Alcoholic hepatitis": {
    doctor1: "Dr. Sunil Desai",
    speciality1: "Hepatology",
    mobNo1: "+91 9876543235",
    doctor2: "Dr. Vikram Joshi",
    speciality2: "General Physician",
    mobNo2: "+91 9123456805",
  },
  "Tuberculosis": {
    doctor1: "Dr. Ananya Roy",
    speciality1: "Pulmonology",
    mobNo1: "+91 9876543236",
    doctor2: "Dr. Karan Singh",
    speciality2: "General Physician",
    mobNo2: "+91 9123456806",
  },
  "Common Cold": {
    doctor1: "Dr. Rajesh Kumar",
    speciality1: "ENT",
    mobNo1: "+91 9876543237",
    doctor2: "Dr. Sunita Rao",
    speciality2: "General Physician",
    mobNo2: "+91 9123456807",
  },
  "Pneumonia": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Pulmonology",
    mobNo1: "+91 9876543238",
    doctor2: "Dr. Rohit Gupta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456808",
  },
  "Dimorphic hemmorhoids(piles)": {
    doctor1: "Dr. Arjun Patel",
    speciality1: "Proctology",
    mobNo1: "+91 9876543239",
    doctor2: "Dr. Priya Mehta",
    speciality2: "General Physician",
    mobNo2: "+91 9123456809",
  },
  "Heartattack": {
    doctor1: "Dr. Sunil Desai",
    speciality1: "Cardiology",
    mobNo1: "+91 9876543240",
    doctor2: "Dr. Karan Singh",
    speciality2: "General Physician",
    mobNo2: "+91 9123456810",
  },
  "Varicoseveins": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Vascular Surgery",
    mobNo1: "+91 9876543241",
    doctor2: "Dr. Arjun Patel",
    speciality2: "General Physician",
    mobNo2: "+91 9123456811",
  },
  "Hypothyroidism": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Endocrinology",
    mobNo1: "+91 9876543242",
    doctor2: "Dr. Anjali Verma",
    speciality2: "General Physician",
    mobNo2: "+91 9123456812",
  },
  "Hyperthyroidism": {
    doctor1: "Dr. Karan Singh",
    speciality1: "Endocrinology",
    mobNo1: "+91 9876543243",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "General Physician",
    mobNo2: "+91 9123456813",
  },
  "Hypoglycemia": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Endocrinology",
    mobNo1: "+91 9876543244",
    doctor2: "Dr. Vikram Joshi",
    speciality2: "General Physician",
    mobNo2: "+91 9123456814",
  },
  "Osteoarthristis": {
    doctor1: "Dr. Arjun Patel",
    speciality1: "Orthopedics",
    mobNo1: "+91 9876543245",
    doctor2: "Dr. Priya Mehta",
    speciality2: "Physiotherapy",
    mobNo2: "+91 9123456815",
  },
  "Arthritis": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Rheumatology",
    mobNo1: "+91 9876543246",
    doctor2: "Dr. Sunil Desai",
    speciality2: "General Physician",
    mobNo2: "+91 9123456816",
  },
  "(vertigo) Paroymsal  Positional Vertigo": {
    doctor1: "Dr. Anjali Verma",
    speciality1: "Neurology",
    mobNo1: "+91 9876543247",
    doctor2: "Dr. Rajesh Kumar",
    speciality2: "ENT",
    mobNo2: "+91 9123456817",
  },
  "Acne": {
    doctor1: "Dr. Sunita Rao",
    speciality1: "Dermatology",
    mobNo1: "+91 9876543248",
    doctor2: "Dr. Vikram Joshi",
    speciality2: "General Physician",
    mobNo2: "+91 9123456818",
  },
  "Urinary tract infection": {
    doctor1: "Dr. Priya Mehta",
    speciality1: "Urology",
    mobNo1: "+91 9876543249",
    doctor2: "Dr. Arjun Patel",
    speciality2: "General Physician",
    mobNo2: "+91 9123456819",
  },
  "Psoriasis": {
    doctor1: "Dr. Meera Sharma",
    speciality1: "Dermatology",
    mobNo1: "+91 9876543250",
    doctor2: "Dr. Sunil Desai",
    speciality2: "General Physician",
    mobNo2: "+91 9123456820",
  },
  "Impetigo": {
    doctor1: "Dr. Rajesh Kumar",
    speciality1: "Dermatology",
    mobNo1: "+91 9876543251",
    doctor2: "Dr. Ananya Roy",
    speciality2: "General Physician",
    mobNo2: "+91 9123456821",
  }
};

const DoctorRecommend: React.FC = () => {
  const { disease } = useParams<{ disease: string }>();

  const record = disease ? staffRecord[disease] : undefined;
  console.log(disease);
  if (!record) {
    return (
      <div>
        <h3>Disease Prediction Result</h3>
        <p>Most Likely Disease: {disease}</p>
        <p>No doctor recommendations available.</p>
      </div>
    );
  }

  return (
    <div>
    
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // full viewport height
    backgroundColor: "#f9f9f9", // optional background
  }}
>
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "24px",
      width: "350px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    }}
  >
    <h3 style={{ marginBottom: "16px", textAlign: "center" }}>🩺 Disease Prediction Result</h3>
    <p style={{ fontSize: "16px" }}>
      <strong>Most Likely Disease:</strong>{" "}
      <span style={{ color: "red", fontWeight: "bold" }}>{disease}</span>
    </p>

    <h4 style={{ marginTop: "24px", marginBottom: "12px" }}>Recommended Doctors:</h4>

    <div style={{ marginBottom: "16px", padding: "12px", borderBottom: "1px solid #eee" }}>
      <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{record.doctor1}</p>
      <p style={{ marginBottom: "4px" }}>{record.speciality1}</p>
      <p style={{ margin: "0" }}>📞 {record.mobNo1}</p>
    </div>

    <div style={{ padding: "12px" }}>
      <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{record.doctor2}</p>
      <p style={{ marginBottom: "4px" }}>{record.speciality2}</p>
      <p style={{ margin: "0" }}>📞 {record.mobNo2}</p>
    </div>
  </div>
</div>
<div className="buttons">
        <Link to="/" className="back-btn">Back to Home</Link>
        <Link to="/add-patient"  className="add-btn">Add Another Patient</Link>
  </div>
</div>
  );
};

export default DoctorRecommend;
