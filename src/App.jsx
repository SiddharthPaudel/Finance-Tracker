import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import './App.css'
import OfferSection from './components/OfferSection.jsx'
import HomePage from './HomePage/HomePage.jsx'
import Login from './Login/Login.jsx'
import Layout from './Layout/Layout.jsx'
import Signup from './Signup/SignUp.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'


function App() {


  return (
    <Router>
      <Routes >
        <Route path='/' element={<Layout/>} >
        <Route index element={<HomePage/>} />
        <Route path='login' element={<Login/>}/>
        <Route path='signUp' element={<Signup/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
    
    
    
  )
}

export default App
