import React ,{useState , useEffect} from 'react';
import './Update.css'
import axios from 'axios'
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {

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


  return (
    <div className='update'>
      <ToastContainer/>
      <h1>Select the event you want to Update</h1>    
            <div className="update-list-table">
              <div className="update-title">
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
                  <div key={index} className='update-list-table-format'>
                    <p>{item.name}</p>
                    <p>{item.about}</p>
                    <p>{item.club}</p>
                    <p>{item.time}</p>
                    <p>{item.date}</p>
                    <p>{item.place}</p>
                    <img src={`${url}/images/`+item.poster} alt="" />
                    <a href={`/update/:${item._id}`}>UPDATE</a>
                  </div>
                )              
              })}
            </div>
    </div>
  )
}

export default Update
