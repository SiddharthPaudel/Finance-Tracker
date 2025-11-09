import React from 'react'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import './App.css'
import Header from "./components/Header.jsx"
import Hero from './components/HeroSection.jsx'
import OfferSection from './components/OfferSection.jsx'
import HomePage from './HomePage/HomePage.jsx'
import Login from './Login/Login.jsx'


function App() {


  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
    
    
    
  )
}

export default App
