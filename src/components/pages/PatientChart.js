import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DContext } from '../../context/Datacontext'
import Chart from 'react-apexcharts'

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


  const lastDiastolicBPChart = findPatient && findPatient.diastolic_bp ? [...findPatient.diastolic_bp] : null
  const lastHeartRateChart = findPatient && findPatient.heart_rate ? [...findPatient.heart_rate] : null
  const lastSystolicBPChart = findPatient && findPatient.systolic_bp ? [...findPatient.systolic_bp] : null
  const lastSpo2Chart = findPatient && findPatient.spo2 ? [...findPatient.spo2].reverse() : null;
  const latsTemperatureChart = findPatient && findPatient.temperature ? [...findPatient.temperature] : null
  const lastBloodSugarChart = findPatient && findPatient.blood_sugar ? [...findPatient.blood_sugar] : null



  useEffect(() => {

    if(!patient){
      console.log("Running")
    }
    
    
    if(!DiastolicBPChart || !HeartRateChart || !SystolicBPChart || !Spo2Chart || !TemperatureChart || !BloodSugarChart){
      setDiastolicBPChart(lastDiastolicBPChart)
      setlastHeartRateChart(lastHeartRateChart)
      setSystolicBPChart(lastSystolicBPChart)
      setSySpo2Chart(lastSpo2Chart)
      setTemperatureChart(latsTemperatureChart)
      setBloodSugarChart(lastBloodSugarChart)
    }

  
  
   setInterval(() => {
     
    }, 5000);

  
  
   
  },[patient , DiastolicBPChart,HeartRateChart,SystolicBPChart,Spo2Chart,TemperatureChart,BloodSugarChart]);


  const chartOptions = {
    chart : {
      id : "chart",
    },
    stroke:{
      width : 1 ,
      curve: 'smooth'
    },
    colors : ['red','blue','orange','#5e32a8','#a832a6','green'],
    xaxis : {
      categories : 0
    },
  }

  const chartSeries =[
    {
      name : 'DiastolicBP',
      data : DiastolicBPChart || []
    },
    {
      name : 'HeartRate',
      data : HeartRateChart || []
    },
    {
      name : 'SystolicBP',
      data : SystolicBPChart || []
    },
    {
      name : 'Spo2',
      data : Spo2Chart || []
    } ,
       
    {
      name : 'Temperature',
      data : TemperatureChart || []
    }, 
    {
      name : 'BloodSugarChart',
      data : BloodSugarChart || []
    }
  ]



  if(!DiastolicBPChart || !HeartRateChart || !SystolicBPChart || !Spo2Chart || !TemperatureChart || !BloodSugarChart){
    return <div>Loading....</div>
  }

 return (
  <div className=" flex justify-center">
    <div className="grid justify-center  w-8/12 ">
     <h2 className="font-bold text-2xl text-center underline text-primary-400">Consult Record</h2>

     <div className=" grid justify-center gap-5 mt-10">
        <div className="grid justify-center gap-2">
            <div className="w-[800px] border px-2 py-2 rounded">
              <h2 className="font-bold text-xl underline text-primary-500 ">Patient Monitoring live chart</h2>

              <Chart options={chartOptions} series={chartSeries} type="line" height={350} />


            </div>


        </div>
        <div className=" flex gap-1">
        <div className=" px-4 py-4 border-2 rounded min-h-[300px] w-[400px] h-auto grid justify-center">
        <p className=" text-2xl underline text-primary-500 ">Patient Details</p>
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

        <div className="  h-20  border-2 rounded px-4 py-4 grid justify-center w-[400px] min-h-[300px]">
              <h2 className="text-primary-500 underline text-2xl">Recent Reading</h2>
              <ul>
              <li><strong>Blood Pressure(BP) : </strong><span>{lastSystolicBP+'/ '+lastDiastolicBP}</span></li>
              <li><strong>Heart Rate : </strong><span>{lastHeartRate}</span></li>
              <li><strong>SpO<sub>2</sub> : </strong><span>{lastSpo2}</span></li>
              <li><strong>Temperature <sup>o</sup>C : </strong><span>{latsTemperature}</span></li>
              <li><strong>Blood Sugar : </strong><span>{lastBloodSugar}</span></li>

              </ul>

        </div>
        </div>



    
     </div>


    </div>
    </div>
  )
}

export default PatientChart
