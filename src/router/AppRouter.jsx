import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Navbar from '../components/Navbar';

const AppRouter = () => {
  return (
    <>
    <Navbar/>
    <Router>
    
    <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />

    </Routes>
</Router>
</>
  )
}

export default AppRouter