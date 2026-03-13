import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus , faPen , faPlus} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
            <div>
                 <h3>ADD</h3>
                 <FontAwesomeIcon icon={faPlus}/>
            </div>            
            </NavLink>
            <NavLink to='/delete' className="sidebar-option"><div>
              <h3>DELETE</h3>
                 <FontAwesomeIcon icon={faMinus}/>
            </div>
            </NavLink>
            <NavLink to='/update' className="sidebar-option">
            <div>
                <h3>UPDATE</h3>
                 <FontAwesomeIcon icon={faPen}/>
            </div>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
