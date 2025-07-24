import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
