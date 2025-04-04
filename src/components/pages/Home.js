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

  useEffect(() => {
    if (patient && patient.fetchPatient) {
      setItemlist(patient.fetchPatient.slice(startingIndex, endingIndex));
    }
  }, [patient, startingIndex, endingIndex]);

  const handleMove = (move) => {
    if (!patient || !patient.fetchPatient) return;

    let nextStartingIndex = move === "previous" ? startingIndex - 10 : startingIndex + 10;
    let nextEndingIndex = move === "previous" ? endingIndex - 10 : endingIndex + 10;

    setStartingIndex(nextStartingIndex);
    setEndingIndex(nextEndingIndex);
  };

  const handleView = (id) => {
    window.location.href=`/view-patient-chart/${id}`
  }

  const handleEdit = () => {

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

  return (
    <div className="p-14 flex flex-col justify-center">
      <div className="flex justify-center">
        <button onClick={() => (window.location.href = "/createPatient")} className="border rounded w-48 px-4 py-3 bg-orange-500 text-white font-bold hover:bg-orange-600">
          Create Patient
        </button>
      </div>

      <div className="flex justify-center min-h-[550px]">
        <table className="w-9/12 border-collapse border-[5px] border-blue-800 mt-5">
          <thead>
            <tr className="bg-blue-200">
              <th className="border px-4 py-2 text-center">Sl.no</th>
              <th className="border px-4 py-2 text-center">PA.id</th>
              <th className="border px-4 py-2 text-center">Pa.name</th>
              <th className="border px-4 py-2 text-center">Gender</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {itemlist && itemlist.length > 0 ? (
              itemlist.map((p, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{p.patientid}</td>
                  <td className="border px-4 py-2 text-center">{p.fullname}</td>
                  <td className="border px-4 py-2 text-center">{p.gender}</td>
                  <td className="border px-4 py-3 text-center flex justify-center gap-3">
                    <button className="  text-green-600 " onClick={()=>handleView(p.patientid)}>
                      <FaEye />
                    </button>
                    <button className=" text-blue-600" onClick={()=>handleEdit(p.patientid)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-600 " onClick={()=>handleDelete(p.patientid)}>
                      <AiFillDelete />
                    </button>
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
        <p className="border rounded bg-gray-500 text-white text-center px-2 py-2 w-10">{startingIndex}</p>
        <button onClick={() => handleMove("next")} className="rounded border bg-black px-2 py-2 text-white font-bold w-28">
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;


