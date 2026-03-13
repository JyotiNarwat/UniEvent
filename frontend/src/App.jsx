import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Today from './pages/today/today'
import Upcoming from './pages/upcoming/upcoming'
import Clubs from './pages/Clubs/Clubs'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {

  const [showLogin , setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>     
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Today/>} />
        <Route path='/upcoming' element={<Upcoming/>}></Route>
        <Route path='/clubs' element={<Clubs/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App

