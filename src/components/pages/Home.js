import React, { useContext, useState, useEffect } from "react";
import { DContext } from "../../context/Datacontext";
import { FaEye, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Home() {
  const BeURL = process.env.REACT_APP_BeURL
  const { patient } = useContext(DContext);
  

  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(10);
  const [itemlist, setItemlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  if(patient && patient.fetchPatient && patient.fetchPatient[0]){
    
  console.log("patient", patient.fetchPatient[0]);
  }

  useEffect(() => {
    if (searchQuery!=="" && patient && patient.fetchPatient) {
      const filteredPatients = patient.fetchPatient.filter((p) =>{
        if(p.fullname.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if(p.patientid.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if(p.gender.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if(p.riskLevel.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if(p.age.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if(p.contact.toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
      });
      setItemlist(filteredPatients.slice(startingIndex, endingIndex));
    }
    else if (patient && patient.fetchPatient) {
      setItemlist(patient.fetchPatient.slice(startingIndex, endingIndex));
    }
    else {
      setItemlist([]);
    }
  }, [searchQuery, patient])

  useEffect(() => {
    if (patient && patient.fetchPatient) {
      setItemlist(patient.fetchPatient.slice(startingIndex, endingIndex));
    }
  }, [patient, startingIndex, endingIndex]);

  const handleMove = (move) => {
    if (!patient || !patient.fetchPatient) return;

    if(move === "previous"){
      if(startingIndex === 0) return;
      setCurrentPage(currentPage - 1);
    }
    else if(move === "next"){
      if(endingIndex >= patient.fetchPatient.length) return;
      setCurrentPage(currentPage + 1);
    }
    else{
      setCurrentPage(1);
    }

    let nextStartingIndex = move === "previous" ? startingIndex - 10 : startingIndex + 10;
    let nextEndingIndex = move === "previous" ? endingIndex - 10 : endingIndex + 10;

    setStartingIndex(nextStartingIndex);
    setEndingIndex(nextEndingIndex);
  };

  const handleView = (id) => {
    window.location.href=`/view-patient-chart/${id}`
  }

  const handleEdit = (id) => {
    window.location.href=`/update-patient/${id}`
  }

  const handleDelete = (id) => {

    
    fetch(`${BeURL}/delete-patient/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if(data.success){
          window.location.reload()
        }
        
      })
      .catch((err) => {
        console.error("Error deleting patient:", err);
        alert("An error occurred while deleting the patient.");
      });
    

  }

  const handleItemNumber = (id) => {
    if (!id) return 0;
    const fetchPatient = (patient.fetchPatient).findIndex((p) => p.patientid === id);
    return fetchPatient+1||0
  }

  return (
    <div className="flex flex-col justify-center px-2">
      
      <h2 className="text-center my-3 text-3xl text-primary-400 font-bold">Patient Dashboard</h2>

      <div className="flex flex-wrap justify-around items-center gap-3 w-[100%] sm:w-9/12 mx-auto my-3">
        <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} type="search" placeholder="Search Patient" className="border rounded w-96 py-3 px-4" />
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => (window.location.href = "/bulk-update-patient")} className="rounded px-4 py-2 border-primary-500 border-[1px] text-primary-400 font-bold hover:bg-primary-500 hover:text-white">
            Bulk Patient update
          </button>
          <button onClick={() => (window.location.href = "/createPatient")} className="border rounded px-4 py-2 bg-primary-500 text-white font-bold hover:bg-primary-600">
            Create Patient
          </button>
        </div>
      </div>

      <div className="flex justify-center min-h-[60vh] overflow-x-auto">
        <table className="w-[95%] sm:w-9/12 mt-5 h-fit table-auto">
          <thead>
            <tr className="bg-blue-200">
              <th className="border p-2 text-center">S. No.</th>
              <th className="border p-2 text-center">ID</th>
              <th className="border p-2 text-center">Name</th>
              <th className="border p-2 text-center hidden sm:table-cell">Gender</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {itemlist && itemlist.length > 0 ? (
              itemlist.map((p, index) => (
                <tr className="h-fit" key={index}>
                  <td className="border p-2 text-center">{handleItemNumber(p.patientid)}</td>
                  <td className="border p-2 text-center">{p.patientid}</td>
                  <td className="border p-2 text-center">{p.fullname}</td>
                  <td className="border p-2 text-center hidden sm:table-cell">{p.gender}</td>
                  <td className="border p-2 text-center">{p.riskLevel}</td>
                  <td className="border p-2 text-center">
                    <div className=" flex justify-center gap-3 items-center">
                      <button className="  text-green-600 " onClick={()=>handleView(p.patientid)}>
                        <FaEye />
                      </button>
                      <button className=" text-blue-600" onClick={()=>handleEdit(p.patientid)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-600 " onClick={()=>handleDelete(p.patientid)}>
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        
      </div>

      <div className="flex gap-10 mt-3 justify-center ">
        <button onClick={() => handleMove("previous")} disabled={startingIndex === 0} className="rounded border bg-black px-2 py-2 text-white font-bold w-28">
          Previous
        </button>
        <p className="border rounded bg-gray-500 text-white text-center px-2 py-2 w-10">{currentPage}</p>
        <button onClick={() => handleMove("next")} className="rounded border bg-black px-2 py-2 text-white font-bold w-28">
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;


