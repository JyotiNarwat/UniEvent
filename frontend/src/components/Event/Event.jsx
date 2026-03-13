import React from 'react'
import './Event.css'
const Event = ({id , name , about , place , time , date , club}) => {
  return (
    <div className='event'>   
    <h1>{name}</h1>
    <p><b>About:</b> {about}</p>
    <h4>Time: {time}</h4>
    <h4>Date: {date}</h4>
    <h4>Club: {club}</h4>
    <h4>Place: {place}</h4>   
    </div>
  )
}

export default Event
