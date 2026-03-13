import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <div className='footer'>
        <h4>Disclaimer : UniEvent is a student-led initiative to bring all campus events together in one place. This website is unofficial and not endorsed by the university. </h4>
        <br /><br />
      <h4>Made with <FontAwesomeIcon icon={faHeart}  /> BY Jyoti Narwat</h4>
    </div>
  )
}

export default Footer
