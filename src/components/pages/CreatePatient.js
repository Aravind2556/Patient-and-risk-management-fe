import React, { useContext, useState } from 'react';
import { DContext } from '../../context/Datacontext';
import BulkPatientCreate from '../blocks/BulkPatientCreate';

const CreatePatient = () => {
    const { BeURL } = useContext(DContext)
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    contact : '' ,
    temperature : '',
    heart_rate : '',
    spo2 : '',
    systolic_bp : '',
    diastolic_bp : '',
    blood_sugar : ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Data:', formData);

    if(formData){
        fetch(`${BeURL}/create-patient`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify(
                formData
            )
        })
        .then(res=>res.json())
        .then(data=>{
          alert(data.message)
          if(data.success){
            window.location.href="/"
          }
        })
        .catch(err=>{
            alert('Trouble in connecting to the Server! Please try again later.')
            console.log('Error in Login:',err)
        })
    }
    else{
        alert("All fields are required!")
    }
    
  };

  return (
    <div className="w-[95%] sm:w-[80%] md:w-[75%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Patient</h2>

      <BulkPatientCreate/>

      <p className='my-3 text-center'>(or)</p>

      <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className='text-left font-bold text-xl text-primary-400'>2) Create single patient</h3>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              
            </select>
          </div>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Contact:</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Temperature: (in Celcius)</label>
            <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Heatrate:</label>
            <input type="text" name="heart_rate" value={formData.heart_rate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Spo2:</label>
            <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">SystolicBP:</label>
            <input type="text" name="systolic_bp" value={formData.systolic_bp} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">DiastolicBP:</label>
            <input type="text" name="diastolic_bp" value={formData.diastolic_bp} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className='w-[100%] sm:w-[48%]'>
            <label className="block text-gray-700">Blood Sugar:</label>
            <input type="text" name="blood_sugar" value={formData.blood_sugar} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Create Patient</button>
      </form>
    </div>
  );
};

export default CreatePatient;
