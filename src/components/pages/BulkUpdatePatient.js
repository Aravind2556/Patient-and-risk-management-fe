import React, { useContext, useRef, useState } from 'react';
import { DContext } from '../../context/Datacontext';
import excelTemplate from '../../assets/Patient_bulk_update_template.xlsx'; // update if separate template exists
import SpreadsheetSvg from '../../assets/spreadsheet.svg'

function BulkUpdatePatient() {
    const { BeURL } = useContext(DContext);
    const fileRef = useRef();
    const [progress, setProgress] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);

    const handleBulkUpdate = async (e) => {
        e.preventDefault();
        const file = fileRef.current.files[0];
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        
        // Show overlay with black backdrop
        setShowOverlay(true);
        setProgress("Uploading file and starting patient update...\n");

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await fetch(`${BeURL}/bulk-update-patient`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            // Process the response stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value);
                    setProgress(prev => prev + chunk);
                }
            }
        } catch (err) {
            setProgress(prev => prev + "\nError uploading file! Try again.");
        } finally {
            // After a short delay, hide the overlay
            setTimeout(() => {
                setShowOverlay(false);
                setProgress('');
            }, 3000);
        }
    };

    return (
        <>
            <form className='my-3 text-center w-[95%] sm:w-[80%] md:w-[75%] mx-auto rounded-md shadow-lg p-5' onSubmit={handleBulkUpdate}>
                <h3 className='font-bold text-2xl text-primary-400 my-3'>Bulk Update Patients</h3>
                <img className='max-h-[250px] my-5 mx-auto' src={SpreadsheetSvg} alt='spreadsheet illustration' />
                <p className="my-2">
                    - Upload the patient data Excel file containing the columns:
                    <br/>
                    <code>patientid, temperature, heart_rate, spo2, systolic_bp, diastolic_bp, blood_sugar</code>
                    <br/>
                    <a download href={excelTemplate} className='font-medium text-sky-500'>Click here</a> to download the template.
                </p>
                <input
                    ref={fileRef}
                    required
                    className='block my-3 mx-auto file:bg-slate-600 file:text-white file:border-none file:px-2 file:rounded-md'
                    type='file'
                />
                <button type='submit' className='bg-primary-400 text-white px-3 py-1 rounded-md my-3'>
                    Bulk update
                </button>
            </form>

            {showOverlay && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                    <div className="bg-white p-4 rounded-md max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-2">Progress</h2>
                        <pre className="whitespace-pre-wrap">{progress}</pre>
                    </div>
                </div>
            )}
        </>
    );
}

export default BulkUpdatePatient;
