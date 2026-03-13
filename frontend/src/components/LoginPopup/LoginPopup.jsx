import React, { useState } from 'react'
import './LoginPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const LoginPopup = ({setShowLogin}) => {
  const [ currState , setCurrState] = useState("Sign-Up");
  return (
    <div className='login-popup'>
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <FontAwesomeIcon className='xmark-icon'onClick={()=>setShowLogin(false)}icon={faCircleXmark} />
        </div>
        <div className="login-details">
          <h3>ONLY FOR CLUB HEADS</h3>
          {currState==="Login"?<></>:<>
          <input type="text" name="" id="" placeholder='Enter Admin-key' />
          <input type="text" placeholder='Enter Name' />
          </>}
          
          <input type="email"  placeholder='Enter Email' required/>
          <input type=" password" placeholder='Enter Password' required/>
          {currState==="Login"?<></>:<>
          <input type="password" placeholder='Confirm Password' required />
          </>}
        </div>
        <button className="login-button">{currState==="Sign-Up"?"Create Account":"Login"}</button>
        {currState==="Login"?<></>:<>
        <p>Already have a account: <span onClick={()=>setCurrState("Login")}>Click here</span></p>
         </>}
      </form>
    </div>
  )
}

export default LoginPopup
