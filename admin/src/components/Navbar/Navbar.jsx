import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.unievent_admin_logo} alt="" />
      <FontAwesomeIcon icon={faUser} size="2x" />
    </div>
  )
}

export default Navbar
