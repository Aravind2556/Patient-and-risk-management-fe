import { Route, Routes } from 'react-router-dom';
import Header from './components/blocks/Header';
import './css/App.css';
import Login from './components/pages/Login';
import HeaderOffcanvas from './components/blocks/HeaderOffCanvas';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Home';
import CreatePatient from './components/pages/CreatePatient';
import UpdatePatient from './components/pages/UpdatePatient';
import BulkUpdatePatient from './components/pages/BulkUpdatePatient';

function App() {

  const {isAuth, currentUser} = useContext(DContext)

  console.log("isauth",isAuth)
  console.log("current user",currentUser)

  if(isAuth===null || !currentUser){
    return <LoadingPage/>
  }

  return (
    <div className="container-fluid p-0">
      <Header/>
      
      <Routes>
        <Route path="/" element={isAuth?(currentUser?.role === 'admin' ? <Home/>:<Login/>) : <Login/>} />
        <Route path="/login" element={isAuth?<Home/>:<Login/>} />
        <Route path='/register' element={isAuth?<Home/>:<Register/>} />
        <Route path='/createPatient' element={isAuth?(currentUser?.role === 'admin' ? <CreatePatient/> : <Login/>) : <Login/>}/>
        <Route path='/update-patient/:id' element={isAuth?<UpdatePatient/> : <Login/>} />
        <Route path='/bulk-update-patient' element={isAuth?<BulkUpdatePatient/> : <Login/>} />
      </Routes>

      <HeaderOffcanvas/>
    </div>
  );
}

export default App;
