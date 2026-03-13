import React , {useContext} from 'react'
import './Today.css'
import Event from '../../components/Event/Event';
import { StoreContext } from '../../Context/StoreContext';
const Today = () => {

  const {event_list} = useContext(StoreContext);
  let today = new Date();


  return (
    <div>
      {event_list.map((event , index)=>{
        let eventDateObj = new Date(event.date);
        if((today.getDate()==eventDateObj.getDate())&& (today.getMonth()==eventDateObj.getMonth())){
          return <Event key={index} id={event._id} name={event.name} about={event.about} club={event.club} time={event.time} date={event.date} place={event.place} />
        }
        
      })}
    </div>
  )
}

export default Today
