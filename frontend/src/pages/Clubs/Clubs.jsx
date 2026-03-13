import React from 'react'
import './Clubs.css'
import { club_list } from '../../assets/assets'

const Clubs = () => {
  return (
    <div className='club-list' id='club-list'>
     {club_list.map((club , index)=>{
        return (
            <div key={index} className="listings">
                <h1>{club.name}</h1>
              <img src={club.image} alt="" />
              <p>{club.about}</p>
              <h4>Lead By: {club.lead_by}</h4>
              <h4>Contact: {club.contact}</h4>
              <hr />
              <br />
            </div>
        )
     })}
    </div>
  )
}

export default Clubs
