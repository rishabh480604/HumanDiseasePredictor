import json
from typing import Union
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException,Request
import joblib
from pydantic import BaseModel
import requests
from mongoengine import Document, StringField, IntField, ListField, connect
app = FastAPI()
# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
'yellow_crust_ooze']

disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
' Migraine','Cervical spondylosis',
'Paralysis (brain hemorrhage)','Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A',
'Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Alcoholic hepatitis','Tuberculosis',
'Common Cold','Pneumonia','Dimorphic hemmorhoids(piles)',
'Heartattack','Varicoseveins','Hypothyroidism','Hyperthyroidism','Hypoglycemia','Osteoarthristis',
'Arthritis','(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis',
'Impetigo']



PINATA_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMTdkMDJmZi00MzI3LTQxOWMtYWUzMi1kYTJmYzBmMjQzZjciLCJlbWFpbCI6InJpc2hhYmgyMjM1NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDIxNjgxODNjMzEzZTE5NzkwNTUiLCJzY29wZWRLZXlTZWNyZXQiOiI1ZmViMTFhNjBiNTYwMjMwZjk1ZDU3ODBiN2I0MzAyMWMzYTBhZGE4M2FlMGYwOTIwZWM4MGRlOGQxMWJkMTljIiwiZXhwIjoxNzc0MjA5NTUzfQ.90-x7mMTl9MboV2Hv2hn3pn-2SjW95HJvHLWD1VpAZo"
l2=[]
for x in range(0,len(l1)):
    l2.append(0)

decisionTree_model = joblib.load('decision_tree_model.pkl')
naiveBayes_model=joblib.load('naiveBayes_model.pkl')
randomForest_model=joblib.load('random_forest_model.pkl')

# Define the patient data model
class PatientData(BaseModel):
    phoneNo: str
    name: str
    age: int
    gender: str
    symptoms: list[str]

class PatientToCidMap(Document):
    phoneNo = StringField(required=True)
    cid = StringField(required=True)
    

connect(db="patients_db", host="mongodb://localhost:27017/patients_db")

@app.get("/")
def read_root():
    return {"Hello": "World"}


# @app.post("/d")
# async def decisionTreePredict(request:Request):

#     # Prepare the symptom data
#     # Get symptoms from the POST request payload
#     print(request)
#     data = await request.json()  # Get the JSON payload
    
    
#     psymptoms = data.get('symptoms', [])  # Get the symptoms array from the JSON
    
#     # psymptoms = [Symptom1.get(), Symptom2.get(), Symptom3.get(), Symptom4.get(), Symptom5.get()]
#     # return {"data":"psymptoms"}
#     for k in range(0, len(l1)):
#         for z in psymptoms:
#             if z == l1[k]:
#                 l2[k] = 1

#     inputtest = [l2]
#     print({"input":inputtest,"type":type(inputtest)})
#     predict = decisionTree_model.predict(inputtest)
#     predicted = predict[0]

    
#     for a in range(0, len(disease)):
#         if predicted == a:
#             return {"predicted_disease": disease[a]}
            
#     return {"predicted_disease": "Not Found"}
        
def decisionTreePredict(data: dict):
    """Predict disease based on symptoms using a Decision Tree model."""
    psymptoms = data.get('symptoms', [])  # Extract symptoms list

    for k in range(0, len(l1)):  
        for z in psymptoms:
            if z == l1[k]:
                l2[k] = 1

    inputtest = [l2]
    # print({"input": inputtest, "type": type(inputtest)})

    predict = decisionTree_model.predict(inputtest)
    predicted = predict[0]

    for a in range(0, len(disease)):
        if predicted == a:
            return {"predicted_disease": disease[a]}
    
    return {"predicted_disease": "Not Found"}


# @app.post("/n")
async def naiveBayesPredict(data: dict):
    # data = await request.json()  # Get the JSON payload
    psymptoms = data.get('symptoms', [])  # Get the symptoms array from the JSON
    
    for k in range(0,len(l1)):
        for z in psymptoms:
            if(z==l1[k]):
                l2[k]=1

    inputtest = [l2]
    predict = naiveBayes_model.predict(inputtest)
    predicted=predict[0]

    for a in range(0,len(disease)):
        if(predicted == a):
            return {"predicted_disease": disease[a]}
            
    return {"predicted_disease": "Not Found"}
        
    

# @app.post("/r")
async def randomForestPredict(data:dict):
    # data = await request.json()  # Get the JSON payload
    psymptoms = data.get('symptoms', [])  # Get the symptoms array from the JSON
    
    for k in range(0,len(l1)):
        for z in psymptoms:
            if(z==l1[k]):
                l2[k]=1

    inputtest = [l2]
    predict = randomForest_model.predict(inputtest)
    predicted=predict[0]

    for a in range(0,len(disease)):
        if(predicted == a):
            return {"predicted_disease": disease[a]}
            
    return {"predicted_disease": "Not Found"}
    
@app.post("/addPatient")
async def store_patient(patient: PatientData):
    
    print("patient Data : ",patient)
    if not (patient.name and patient.phoneNo and patient.age and patient.gender and patient.symptoms):
        raise HTTPException(status_code=400, detail="Missing required patient details")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {PINATA_JWT}"
    }
    inputVal={"symptoms":patient.symptoms}
    decisionTreeResult= decisionTreePredict(inputVal)
    randomForestResult= await randomForestPredict(inputVal)
    naiveBayesResult=await naiveBayesPredict(inputVal)
    print("decison : ",decisionTreeResult,"  random : ",randomForestResult," naive : ",naiveBayesResult)
    updated_Patient=patient.dict()
    updated_Patient["predicted"]=[decisionTreeResult['predicted_disease'],randomForestResult['predicted_disease'],naiveBayesResult['predicted_disease']]
    

    payload = {
        "pinataContent": updated_Patient,
        "pinataMetadata": {"name": f"patient_{patient.name}.json"}  # Set filename
    }

    try:
        response = requests.post(PINATA_URL, json=payload, headers=headers)
        response_data = response.json()
        print("responseData : ",response_data)

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=response_data)

        mongoDocument=PatientToCidMap(phoneNo=patient.phoneNo)
        mongoDocument.cid=response_data["IpfsHash"]
        mongoDocument.save()
        print("patientId : ",patient.phoneNo,"cid :  ",response_data["IpfsHash"])
        return {"cid": response_data["IpfsHash"],"patientId":patient.phoneNo ,"message": "Patient data stored successfully"}
        
        
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/searchPatient/{patientId}")
async def searchPatient(patientId: str, request: Request):
    
    try:
        mongoResponse=PatientToCidMap.objects(phoneNo=patientId)
        
        if(len(mongoResponse)==0):
            return {"status": 400,"message":"invalid patiendId"}
        mongoResult=mongoResponse.first()
        # print("res : ",mongoResult)
        
        # if mongoResult!=None:
            
        # else:
        #     return {"status": 400,"message":"invalid patiendId"}
        

        # return {"status":200,"patientData":"empty","message":"data fetch success"}
        # print("mapped url : ",f'https://harlequin-rational-snail-803.mypinata.cloud/ipfs/{mongoResult.cid}')
        response= requests.get(f'https://harlequin-rational-snail-803.mypinata.cloud/ipfs/{mongoResult.cid}')
        print("reponse of data : ",response)
        
        if(response):
            patientDoc=response.json()
            print("res : ",mongoResult)
            return {'status':200,"message":"data fetched success",'patientData':patientDoc}
        else:
            return {"status":404,"patientData":"Empty Response from pinnata","message":"could not fetch data"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5000)