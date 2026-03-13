import React , { useState}from 'react'
import './Add.css'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Add = () => {
const url = "http://localhost:4000";
const [image , setImage] = useState(false);
const [data , setData] = useState({
  name:"",
  about:"",
  club:"",
  time:"",
  place:"",
  date:"",
});

const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data ,[name]:value}));
}

const onSubmitHandler = async (event) => {
  event.preventDefault();
  const formdata = new FormData();
  formdata.append("name" , data.name);
  formdata.append("about" , data.about);
  formdata.append("time" , data.time);
  formdata.append("club" , data.club);
  formdata.append("date" , data.date);
  formdata.append("place" , data.place);
  formdata.append("image" , image);
  const response = await axios.post(`${url}/api/event/add` , formdata);
  if (response.data.success) {
    setData({
  name:"",
  about:"",
  club:"",
  time:"",
  place:"",
  date:"",
    })
    setImage(false);
    toast.success(response.data.message);
  } else {
    console.log(error);
    toast.error(response.data.message);
  }
}

return(
   <div className='add'>
   <ToastContainer/>
      <form className="add-form" onSubmit={onSubmitHandler}>
        <h1>Event Details</h1>
        <div className="add-name ">
          <p>Enter Name: </p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-about">
          <p>Description: </p>
           <input onChange={onChangeHandler} value={data.about} type="text" name='about' placeholder='Type here' />
        </div>
        <div className="add-club">
          <p>Enter Club: </p>
          <input onChange={onChangeHandler} value={data.club} type="text"name='club' placeholder='Type here'/>
        </div>
        <div className="add-time">
          <p>Enter Time: </p>
             <input onChange={onChangeHandler} value={data.time} type="text" name='time' placeholder='Type here'/>
        </div>
        <div className="add-date">
          <p>Enter Date: </p>
           <input onChange={onChangeHandler} value={data.date} type="text" name='date' placeholder='Type here'/>
        </div>
        <div className="add-place">
          <p>Enter Place: </p>
           <input onChange={onChangeHandler} value={data.place} type="text" name='place' placeholder='Type here'/>
        </div>
        
        <div className="upload-image">
          <p>Upload Image:</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area_image} alt="" />          
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image"  hidden required />
        </div>
        <button type='submit' className="add-btn">Add Event</button>
      </form>
    </div>
)
}

export default Add
