import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

  const [menu , setMenu]= useState("today");
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <img src={assets.UniEvent_Logo} alt="" />
      <ul className="navbar-menu">
        <li onClick={()=>{setMenu("today");
          navigate("/")}} className={menu==="today"?"active":""}>Today</li>
        <li onClick={()=>{
          setMenu("Upcoming");
          navigate("/upcoming")}} className={menu==="Upcoming"?"active":""}>Upcoming</li>
        <li onClick={()=>{
          setMenu("Clubs");
          navigate("/clubs")}}  className={menu==="Clubs"?"active":""}>Clubs</li>
      </ul>
      <div className="navbar-right">
        <h3>Search</h3>
        <button onClick={()=>setShowLogin(true)}>Login</button>
      </div>
    </div>
  )
}

export default Navbar
