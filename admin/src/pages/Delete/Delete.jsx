import React , {useState , useEffect} from 'react'
import './Delete.css'
import axios from 'axios'
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Delete = () => {

  const url="http://localhost:4000";
  const [list , setList]= useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/event/list`);
    
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error Occured");
    }
  }

  useEffect(()=>{
    fetchList();
  },[]);

  const removeFood = async (eventId) => {
    const response = await axios.post(`${url}/api/event/remove` , {id:eventId});
    await fetchList();
    if (response.data.success) {
      toast.success("event removed");
    } else {
      toast.error("error occured");
    }

  }

  return (
    <div className='list add flex-col'>
      <ToastContainer/>
      <p>List of Events under your club </p>
      <div className="list-table">
        <div className="title">
          <b>Name</b>
          <b>About</b>
          <b>Club</b>
          <b>Time</b>
          <b>Date</b>
          <b>Place</b>
          <b>Image</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <p>{item.name}</p>
              <p>{item.about}</p>
              <p>{item.club}</p>
              <p>{item.time}</p>
              <p>{item.date}</p>
              <p>{item.place}</p>
              <img src={`${url}/images/`+item.poster} alt="" />
               <p onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
          
        })}
      </div>
      
    </div>
  )
}

export default Delete
