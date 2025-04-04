import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DContext } from '../../context/Datacontext'

const PatientChart = () => {

    const {patient}=useContext(DContext)
    const {id}=useParams()
    
    const findPatient = patient && patient.fetchPatient.length > 0 ? patient.fetchPatient.find((item)=> item.patientid === id) : ''
    console.log("find pateint",findPatient)


  return (
    <div className="grid justify-center">
     <h2 className="font-bold text-2xl text-center">Consult Record</h2>

     <div className=" flex justify-center gap-5 mt-10">
        <div className="grid justify-center">
            <div className=" bg-black w-96 h-20">

            </div>
            <div className=" bg-black w-96 h-20">

            </div>


        </div>

        <div>
            {
              findPatient && (
                <ul>
                <li><strong>Patientid : </strong>{findPatient.patientid}</li>
                <li><strong>Fullname  : </strong>{findPatient.fullname}</li>
                <li><strong>Age       : </strong>{findPatient.age}</li>
                <li><strong>Contact : </strong>{findPatient.contact}</li>
                <li><strong>Gender : </strong>{findPatient.gender}</li>
                <li><strong>Patientid : </strong>{findPatient.patientid}</li>
                </ul>

              )  
            }
        </div>
    
     </div>


    </div>
  )
}

export default PatientChart
