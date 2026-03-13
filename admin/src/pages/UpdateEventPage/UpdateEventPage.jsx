import React , {useState , useEffect}from 'react'
import { useParams } from "react-router-dom";
import './UpdateEventPage.css'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateEventPage = () => {
    const url = "http://localhost:4000";
    const {id} = useParams();
const [image , setImage] = useState(false);
const [data , setData] = useState({
  name:"",
  about:"",
  club:"",
  time:"",
  place:"",
  date:"",
});

 //const { eventId } = useParams(); // eventId will be "123"

const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data ,[name]:value}));
}

const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    const formdata = new FormData();
  formdata.append("name" , data.name);
  formdata.append("about" , data.about);
  formdata.append("time" , data.time);
  formdata.append("club" , data.club);
  formdata.append("date" , data.date);
  formdata.append("place" , data.place);
  //formdata.append("image" , image);
  
  const response = await axios.put(`${url}/api/event/${id}` , formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

  if (response.data.success) {
    setData({
  name:"",
  about:"",
  club:"",
  time:"",
  place:"",
  date:"",
    })
    //setImage(false);
    toast.success(response.data.message);
  }
}catch (error) {
        console.log(error);
        toast.error(response.data.message);
  }
  

}

//   const { id } = useParams();
//   const event = event.find(e => e.id.toString() === id);
//   useEffect(() => {
//   if (event) {
//     setData({
//       name: event.name || "",
//       about: event.about || "",
//       club: event.club || "",
//       time: event.time || "",
//       place: event.place || "",
//       date: event.date || "",
//     });
//   }
// }, [event]);


  // if (!event) {
  //   return <p>Event not found</p>;
  // }



  return (
   <div className='updateEvent'>
   <ToastContainer/>
      <form className="updateEvent-form" onSubmit={onSubmitHandler}>
        <h1>Event Details</h1>
        <div className="updateEvent-name ">

          <p>Enter Name: </p>
          <input onChange={onChangeHandler}   value={data.name}  type="text" name='name' placeholder='ryfcf'/>
        </div>
         <div className="updateEvent-about">
          <p>Description: </p>
           <input onChange={onChangeHandler} value={data.about} type="text" name='about' placeholder='Type here' />
        </div>
        <div className="updateEvent-club">
          <p>Enter Club: </p>
          <input onChange={onChangeHandler} value={data.club} type="text"name='club' placeholder='Type here'/>
        </div>
        <div className="updateEvent-time">
          <p>Enter Time:</p>
             <input onChange={onChangeHandler} value={data.time} type="text" name='time' placeholder='Type here'/>
        </div>
        <div className="updateEvent-date">
          <p>Enter Date:</p>
           <input onChange={onChangeHandler} value={data.date} type="text" name='date' placeholder='Type here'/>
        </div>
        <div className="updateEvent-place">
          <p>Enter Place: </p>
           <input onChange={onChangeHandler} value={data.place} type="text" name='place' placeholder='Type here'/>
        </div>
        
        <div className="updateEvent-upload-image">
          <p>Upload Image:</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area_image} alt="" />          
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image"  hidden required />
        </div> 
        <button type='submit' className="updateEvent-btn">Add Event</button> 
      </form>
    </div>
)
}

export default UpdateEventPage
