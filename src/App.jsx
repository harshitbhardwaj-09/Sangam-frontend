
import Gis from './Components/Gis';
import Navbar from './Components/Navbar';
import TrainingPage from './Components/Training';
import VideoConferencePage from './pages/VideoConfrencing';
import DashboardPage from './Components/Dashboard';
import ProjectsM from './Components/ProjectsM';
import Project from './Components/Projects';
import Resources from './Components/Resources';
import Sidebar from './Components/Sidebar';
import OfficerTasks from './Components/officerTasks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectDetails from './Components/ProjectDetails';
import ChatApp from './Components/Chat';
import DiscussionForum from './Components/Disscuss';
import BidSystem from './Components/BidSystem'
import BiddingPage from './Components/Bidding';
import Login from './Components/Login';
import Register from './Components/Register';
import DepartmentPage from './pages/DepartmentPage';
import {generateToken, messaging} from './notification/firebase';
import toast ,{Toaster} from 'react-hot-toast';
import {onMessage} from 'firebase/messaging';
import {useEffect} from 'react'
import Loginn from './Components/loginn';
// import gis3d from './Components/gis3d';
// import { generateToken } from './notification/firebase';
const App = () => {
  
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body,{icon:'🔔'});
    })
  },[]);
  

  return (

   


    <Router>
      
      <div className="App">
      <Toaster position='top-right' toastOptions={{ style: {border: '1px solid #713200',padding: '16px', color: '#713200',},}}/>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </div>


      <div className="flex">
        <Sidebar />
        <div className="flex-grow pt-5">
          <Navbar /> 
          <Routes>
            {/* <Route path='/gis3d' element={<gis3d/>}/> */}
            <Route path='/department' element={<DepartmentPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/loginn' element={<Loginn/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/Bidding" element={<BiddingPage/>}/>
            <Route path="/Geolocation Interface" element={<Gis/>}/>
            <Route path="/training" element={<TrainingPage/>}/>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/BidSystem" element={<BidSystem/>}/>
            <Route path="/taskManager" element={<OfficerTasks />} />
            <Route path="/Projects" element={<ProjectsM />} />
            <Route path="/ProjectDetails" element={<ProjectDetails />} />
            <Route path="/ProjectDetails" element={<ProjectDetails />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/discussion" element={<DiscussionForum />} />
            <Route path= "/video-conference" element = {<VideoConferencePage/>}/>
            <Route path="/ProjectManagement" element={<Project />} />
            <Route path="/Resources" element={<Resources />} />
          </Routes>
          
        </div>
      </div>
    </Router>
  );
};

export default App;


// import Gis3D from './Components/Gis3D';  // Ensure this is the correct path

// const App = () => {
//   return (
//     <div>
//       <h1>Test Gis3D</h1>
//       <Gis3D />
//     </div>
//   );
// };

// export default App;