import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DContext } from '../../context/Datacontext';
import LoadingPage from './Loading';

function UpdatePatient() {
  const { id } = useParams(); // id corresponds to the patientid
  const { patient, BeURL } = useContext(DContext);
  const [patientData, setPatientData] = useState(null);
  const [formValues, setFormValues] = useState({
    temperature: '',
    heart_rate: '',
    spo2: '',
    systolic_bp: '',
    diastolic_bp: '',
    blood_sugar: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient && patient.fetchPatient && id && BeURL) {
      const currentPatient = patient.fetchPatient.find(
        (p) => p.patientid.toLowerCase() === id.toLowerCase()
      );
      if (currentPatient) {
        setPatientData(currentPatient);
        console.log("currentPatient", currentPatient);
      }
    }
  }, [id, patient, BeURL]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Ensure every field is provided and is a valid number
    for (const key in formValues) {
      if (formValues[key] === '') {
        setError(`${key.replace('_', ' ')} is required.`);
        return false;
      }
      if (isNaN(Number(formValues[key]))) {
        setError(`${key.replace('_', ' ')} must be a valid number.`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setMessage('');
    setError('');

    // Prepare payload: convert input strings to numbers
    const payload = {
      temperature: Number(formValues.temperature),
      heart_rate: Number(formValues.heart_rate),
      spo2: Number(formValues.spo2),
      systolic_bp: Number(formValues.systolic_bp),
      diastolic_bp: Number(formValues.diastolic_bp),
      blood_sugar: Number(formValues.blood_sugar),
    };

    try {
      const response = await fetch(`${BeURL}/update-patient/${patientData.patientid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Patient updated successfully!");
        window.location.href = `/view-patient-chart/${patientData.patientid}`
      } else {
        setError(result.message || "Update failed.");
      }
    } catch (err) {
      setError("Error updating patient.");
    }
    setLoading(false);
  };

  if (!patientData) {
    return <LoadingPage />;
  }

  return (
    <div className='min-h-[85vh]'>
      <h2 className="text-center my-3 text-3xl text-primary-400 font-bold">Update Patient</h2>
      <form className="max-w-lg mx-auto p-4 border rounded" onSubmit={handleSubmit}>
        {/* Readonly Fields */}
        <div className="mb-4">
          <label className="block font-bold">ID:</label>
          <input type="text" value={patientData.id} readOnly className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Patient ID:</label>
          <input type="text" value={patientData.patientid} readOnly className="w-full p-2 border rounded" />
        </div>
        {/* Editable Fields for new vital readings */}
        <div className="mb-4">
          <label className="block font-bold">Temperature:</label>
          <input
            type="number"
            name="temperature"
            value={formValues.temperature}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Temperature in Celsius"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Heart Rate:</label>
          <input
            type="number"
            name="heart_rate"
            value={formValues.heart_rate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Heart Rate in BPM"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">SPO2:</label>
          <input
            type="number"
            name="spo2"
            value={formValues.spo2}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter SPO2 in percentage"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Systolic BP:</label>
          <input
            type="number"
            name="systolic_bp"
            value={formValues.systolic_bp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Systolic BP in mmHg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Diastolic BP:</label>
          <input
            type="number"
            name="diastolic_bp"
            value={formValues.diastolic_bp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Diastolic BP in mmHg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Blood Sugar:</label>
          <input
            type="number"
            name="blood_sugar"
            value={formValues.blood_sugar}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter Blood Sugar in mg/dL"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-primary-400 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </form>
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </div>
  );
}

export default UpdatePatient;
