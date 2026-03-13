import React, { useContext } from 'react'
import './Upcoming.css'
import { StoreContext } from '../../Context/StoreContext'
import Event from '../../components/Event/Event'
const Upcoming = () => {

  const {event_list} = useContext(StoreContext);
  let today = new Date();
  const today_date= today.getDate();
  return (
    <div className='upcoming'>
     {event_list.map((event,index)=>{
     let eventDateObj = new Date(event.date);
     let dayOfEvent = eventDateObj.getDate();
     let MonthOfEvent = eventDateObj.getMonth();

      if( (dayOfEvent>today_date)||(MonthOfEvent > today.getMonth()) ){
       return <Event key={index} id={event._id} name={event.name} about={event.about} club={event.club} time={event.time} date={event.date} place={event.place} />

      }
 })}
    </div>
  )
}

export default Upcoming
