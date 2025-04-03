import React from 'react';

function Home() {

  const handlePatientCreate = () => {
    window.location.href='/createPatient'
  }
  return (
    <div  className="p-14 flex flex-col justify-center">
      <div className="flex justify-center" onClick={handlePatientCreate}>
      <button className="border rounded w-48 px-4 py-3 bg-orange-500 text-white font-bold hover:bg-orange-600">
        Create Patient
      </button>
      </div>

<div className=" flex justify-center">
<table className="w-9/12 border-collapse border-[5px] border-blue-800 mt-5 ">
        <thead>
          <tr className="bg-blue-200">
            <th className="border px-4 py-2 text-center">Sl.no</th>
            <th className="border px-4 py-2 text-center">PA.id</th>
            <th className="border px-4 py-2 text-center">Pa.name</th>
            <th className="border px-4 py-2 text-center">Date</th>
            <th className="border px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Row (Add Dynamic Data Here) */}
          <tr>
            <td className="border px-4 py-2 text-center">1</td>
            <td className="border px-4 py-2 text-center">PA001</td>
            <td className="border px-4 py-2 text-center">John Doe</td>
            <td className="border px-4 py-2 text-center">2025-04-02</td>
            <td className="border px-4 py-2 text-center justify-center flex gap-3">
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">View</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
</div>
    </div>
  );
}

export default Home;
