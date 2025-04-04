import { createContext, use, useEffect, useState } from "react";


export const DContext = createContext()


const DataContext = ({children}) => {

    const BeURL = process.env.REACT_APP_BeURL
    const [isAuth, setIsAuth] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [patient,setPatient]=useState(null)

    useEffect(()=>{
        fetch(`${BeURL}/checkauth`,{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setIsAuth(true)
                setCurrentUser(data.user)
            }
            else{
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            setIsAuth(null)
            setCurrentUser(null)
            console.log("Erron in fetching User:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    },[])


    const handleLogout = () => {
        fetch(`${BeURL}/logout`,{
            credentials: "include"

        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message)
            if(data.success){
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            console.log("Erron in Logout:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    }

    const fetchPatient = async () => {
        if (!patient) {
            try {
                const response = await fetch(`${BeURL}/fetch-patient`, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch patient");
                const data = await response.json();
                setPatient(data);  // Assuming you have a state setter function
            } catch (error) {
                console.error("Error fetching patient:", error);
            }
        }
    };
    
    useEffect(() => {
        fetchPatient();
        const interval = setInterval(() => {
            fetchPatient();
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup function should return a function
    }, []);




    const data = {isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout ,patient}

    return (
        <DContext.Provider value={data}>
            {children}
        </DContext.Provider>
    )
}

export default DataContext