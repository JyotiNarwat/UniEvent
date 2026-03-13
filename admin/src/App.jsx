import React  from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
//import axios from 'axios'
import Add from './pages/Add/Add'
import Delete from './pages/Delete/Delete'
import Update from './pages/Update/Update'
import UpdateEventPage from './pages/UpdateEventPage/UpdateEventPage'

const App = () => {
  // const url="http://localhost:4000";
  // const [events, setEvents] = useState([]);

  // const getEvent = async (events) => {
  //   const response = await axios.get(`${url}/api/event`);
  //   setEvents(response.data.events);

  // }

//   useEffect(() => {
//   const fetchEvents = async () => {
//     const response = await axios.get("http://localhost:4000/api/event");
//     setEvents(response.data.events);
//   };
//   fetchEvents();
// }, []);

  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/delete' element={<Delete/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/update/:id' element={<UpdateEventPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

