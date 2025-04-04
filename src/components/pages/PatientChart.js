import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DContext } from '../../context/Datacontext'

const PatientChart = () => {

  const {patient}=useContext(DContext)
  const {id}=useParams()

  const [DiastolicBPChart,setDiastolicBPChart]=useState(null)
  const [HeartRateChart,setlastHeartRateChart]=useState(null)
  const [SystolicBPChart,setSystolicBPChart]=useState(null)
  const [Spo2Chart,setSySpo2Chart]=useState(null)
  const [TemperatureChart,setTemperatureChart]=useState(null)
  const [BloodSugarChart,setBloodSugarChart]=useState(null)

  console.log("multiple",DiastolicBPChart , HeartRateChart , SystolicBPChart , Spo2Chart , TemperatureChart , BloodSugarChart )
    
  const findPatient = patient && patient.fetchPatient.length > 0 ? patient.fetchPatient.find((item)=> item.patientid === id) : null
    

  const lastDiastolicBP = findPatient && findPatient.diastolic_bp ? [...findPatient.diastolic_bp].reverse()[0] : null
  const lastHeartRate = findPatient && findPatient.heart_rate ? [...findPatient.heart_rate].reverse()[0] : null
  const lastSystolicBP = findPatient && findPatient.systolic_bp ? [...findPatient.systolic_bp].reverse()[0] : null
  const lastSpo2 = findPatient && findPatient.spo2 ? [...findPatient.spo2].reverse()[0] : null;
  const latsTemperature = findPatient && findPatient.temperature ? [...findPatient.temperature].reverse()[0] : null
  const lastBloodSugar = findPatient && findPatient.blood_sugar ? [...findPatient.blood_sugar].reverse()[0] : null


  const lastDiastolicBPChart = findPatient && findPatient.diastolic_bp ? [...findPatient.diastolic_bp].reverse() : null
  const lastHeartRateChart = findPatient && findPatient.heart_rate ? [...findPatient.heart_rate].reverse() : null
  const lastSystolicBPChart = findPatient && findPatient.systolic_bp ? [...findPatient.systolic_bp].reverse() : null
  const lastSpo2Chart = findPatient && findPatient.spo2 ? [...findPatient.spo2].reverse() : null;
  const latsTemperatureChart = findPatient && findPatient.temperature ? [...findPatient.temperature].reverse() : null
  const lastBloodSugarChart = findPatient && findPatient.blood_sugar ? [...findPatient.blood_sugar].reverse() : null

  const handleUpdatePatientData = () => {
    if(!DiastolicBPChart){
      setDiastolicBPChart(lastDiastolicBPChart)
    }

    if(!HeartRateChart){
      setlastHeartRateChart(lastHeartRateChart)
    }

    if(!SystolicBPChart){
      setSystolicBPChart(lastSystolicBPChart)

    }
    if(!Spo2Chart){
      setSySpo2Chart(lastSpo2Chart)

    }
    if(!TemperatureChart){
      setTemperatureChart(latsTemperatureChart)

    }
    if(!BloodSugarChart){
      setBloodSugarChart(lastBloodSugarChart)
     }
  }

  useEffect(() => {
    handleUpdatePatientData(); // Initial call
  
    const interval = setInterval(() => {
      handleUpdatePatientData(); // Call every 5 seconds
    }, 5000);
  
   
  });

 


 






return (
    <div className="grid justify-center">
     <h2 className="font-bold text-2xl text-center">Consult Record</h2>

     <div className=" flex justify-center gap-5 mt-10">
        <div className="grid justify-center">
            <div className=" bg-black w-96 h-20">

            </div>
            <div className=" w-96 h-20  border-2 rounded px-4 py-4 grid justify-center min-h-[250px]">
              <h2 className="text-cyan-500 underline text-2xl">Recent Reading</h2>
              <ul>
              <li><strong>Blood Pressure(BP) : </strong><span>{lastSystolicBP+'/ '+lastDiastolicBP}</span></li>
              <li><strong>Heart Rate : </strong><span>{lastHeartRate}</span></li>
              <li><strong>SpO<sub>2</sub> : </strong><span>{lastSpo2}</span></li>
              <li><strong>Temperature <sup>o</sup>C : </strong><span>{latsTemperature}</span></li>
              <li><strong>Blood Sugar : </strong><span>{lastBloodSugar}</span></li>

              </ul>

            </div>


        </div>

        <div className=" px-4 py-4 border-2 rounded min-h-[300px] w-[300px] grid justify-center">
        <p className=" text-2xl underline text-cyan-500 ">Patient Details</p>
            {
              findPatient && (
              <ul>
                <li><strong>Patientid : </strong>{findPatient.patientid}</li>
                <li><strong>Fullname  : </strong>{findPatient.fullname}</li>
                <li><strong>Age       : </strong>{findPatient.age}</li>
                <li><strong>Contact : </strong>{findPatient.contact}</li>
                <li><strong>Gender : </strong>{findPatient.gender}</li>
                <li><strong>Status : </strong><span  className={`${findPatient.riskLevel === 'Severe' ? "text-red-600 font-bold" : "text-green-600"}`}>{findPatient.riskLevel}</span></li>
                </ul>
               
                )  
            }
        </div>
    
     </div>


    </div>
  )
}

export default PatientChart
