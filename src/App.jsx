// import React, { useState } from 'react';
// import Gis from './Components/Gis';
// import Navbar from './Components/Navbar';
// import TrainingPage from './Components/Training';
// import VideoConferencePage from './pages/VideoConfrencing';
// import DashboardPage from './Components/Dashboard';
// import ProjectsM from './Components/ProjectsM';
// import Project from './Components/Projects';
// import Resources from './Components/Resources';
// import Sidebar from './Components/Sidebar';
// import OfficerTasks from './Components/OfficerTasks';
// import TaskManager from './Components/TaskManager';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProjectDetails from './Components/ProjectDetails';
// import ChatApp from './Components/Chat';
// import DiscussionForum from './Components/Disscuss';
// import BidSystem from './Components/BidSystem'
// import BiddingPage from './Components/Bidding';
// import Login from './Components/Login';
// import Register from './pages/Register';
// import AnamolyDetectionPage from './Components/AnamolyDetection';
// import GisMap from './Components/GisMap'
// import DepartmentPage from './pages/DepartmentPage';
// import { generateToken, messaging } from './notification/firebase';
// import toast, { Toaster } from 'react-hot-toast';
// import { onMessage } from 'firebase/messaging';
// import { useEffect } from 'react'
// import Seminar from './Components/Seminar';
// import Videos from './Components/Videos';
// import News from './Components/News';
// import LoginPage from './pages/LoginPage';
// import CostReductionPage from './Components/CostRedPred';
// import MapWithLine from './Components/MapWithLine';
// import axios from 'axios';
// import UserDashboard from './Components/UserDashboard';
// import MapNew from './Components/MapNew';
// import ConflictPredPage from './Components/ConflictPre';
// import DepartmentPredPage from './Components/DepartmentPredPage';
// import ResourceAllocationPage from './Components/ResourceAllocationPage';
// import GisNew from './Components/Gisnew';
// import CompletedPath from './Components/TotalPath';
// import TotalPath from './Components/CompletedPath';
// import Arya from './Components/arya';
// import DepartmentDetails from './Components/DepartmentDetails';


// const App = () => {

//   useEffect(() => {
//     generateToken();
//     onMessage(messaging, (payload) => {
//       console.log(payload);
//       toast(payload.notification.body, { icon: '🔔' });
//     })
//   }, []);

//   const [resourcesIds, setResourcesIds] = useState([]);


//   //complete backend data fetching into global variables
//   const getData = async () => {

//     // Fetch all departments  
//     const dept = await axios.get("https://backend-code-5-2tsr.onrender.com/api/getalldep")
//     // console.log(dept.data);
//     const getDeptName = dept.data
//     // Variables to store the data
//     let departmentIds = [];
//     let departmentNames = [];
//     let departmentDescriptions = [];

//     // Iterate through each department and store its values in respective arrays
//     getDeptName.forEach((department) => {
//       departmentIds.push(department._id);  // Store id
//       departmentNames.push(department.name);  // Store name
//       departmentDescriptions.push(department.description);  // Store description
//     });

//     // Log the stored data
//     //  console.log("Department IDs:", departmentIds);
//     //  console.log("Department Names:", departmentNames);
//     //  console.log("Department Descriptions:", departmentDescriptions);



//     //Fetch all Projects
//     const proj = await axios.get("https://backend-code-5-2tsr.onrender.com/api/getallprojects")
//     const getProject = proj.data
//     // Variables to store the data
//     let projectIds = [];
//     let projectNames = [];
//     let projectDescriptions = [];

//     // Iterate through each department and store its values in respective arrays
//     getProject.forEach((project) => {
//       projectIds.push(project._id);  // Store id
//       projectNames.push(project.name);  // Store name
//       projectDescriptions.push(project.description);  // Store description
//     });

//     // Log the stored data
//     //  console.log("Project IDs:", projectIds);
//     //  console.log("Project Names:", projectNames);
//     //  console.log("Project Descriptions:", projectDescriptions);

//     //Fetch all resources
//     const res = await axios.get("https://backend-code-5-2tsr.onrender.com/api/getallresources")
//     const getResources = res.data
//     // Variables to store the data
//     let resourcesNames = [];
//     let resourcesDescriptions = [];

//     const ids = getResources.map((resource) => resource._id);
//     setResourcesIds(ids);

//     // Iterate through each department and store its values in respective arrays
//     getResources.forEach((resource) => {
//       // setResourcesIds.push(resource._id);  // Store id
//       resourcesNames.push(resource.name);  // Store name
//       resourcesDescriptions.push(resource.description);  // Store description
//     });

//     // Log the stored data
//     //  console.log("Resource IDs:", resourcesIds);
//     //  console.log("Resource Names:", resourcesNames);
//     //  console.log("Resource Descriptions:", resourcesDescriptions);


//     //fetch resources by project id
//     const resbyid = await axios.get("https://sangam-c2fm.onrender.com/api/project/6749b789545dcca89c35d67a/resources")
//     const getResourcesbyid = resbyid.data
//     // console.log(getResourcesbyid);
    

//   }
//   getData();
//   return (




//     <Router>

//       <div className="App">

//         <Toaster position='top-right' toastOptions={{ style: { border: '1px solid #713200', padding: '16px', color: '#713200', }, }} />
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>


//       <div className="flex">
       

//         <Sidebar />
//         <div className="flex-grow pt-5">
//           <Navbar />
//           <Routes>
//             <Route path='/login' element={<LoginPage resource={resourcesIds} />} />
//             <Route path='/departmentprediction' element={<DepartmentPredPage />} />
//             <Route path='/departmentdetails' element={<DepartmentDetails />} />
//             <Route path='/costreduction' element={<CostReductionPage />} />
//             <Route path='/gisnew' element={<GisNew />} />
//             <Route path='/aryan' element={<Arya />} />
//             <Route path='/completedpath' element={<CompletedPath />} />
//             <Route path='/totalpath' element={<TotalPath />} />
//             <Route path='/reallocate' element={<ResourceAllocationPage />} />
//             <Route path='/conflictprediction' element={<ConflictPredPage />} />
//             <Route path='/seminar' element={<Seminar />} />
//             <Route path='/maps' element={<MapWithLine />} />
//             <Route path='/mapsnew' element={<MapNew />} />
//             <Route path='/project/:projectId/anamoly' element={<AnamolyDetectionPage />} />
//             <Route path='/videos' element={<Videos />} />
//             <Route path='/news' element={<News />} />
//             <Route path='/department' element={<DepartmentPage />} />
//             <Route path='/UserDashboard' element={<UserDashboard />} />
//             <Route path="/project/:projectId/gis" element={<GisMap />} />
//             {/* <Route path='/login' element={<Login />} /> */}
//             <Route path='/register' element={<Register />} />
//             <Route path="/Bidding" element={<BiddingPage />} />
//             <Route path="/Geolocation Interface" element={<Gis />} />
//             <Route path="/training" element={<TrainingPage />} />
//             <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/BidSystem" element={<BidSystem />} />
//             <Route path="/taskManager" element={<TaskManager />} />
//             <Route path="/Projects" element={<Project />} />
//             <Route path="/Project/:projectId" element={<ProjectDetails />} />
//             <Route path="/chat" element={<ChatApp />} />
//             <Route path="/discussion" element={<DiscussionForum />} />
//             <Route path="/video-conference" element={<VideoConferencePage />} />
//             <Route path="/ProjectManagement" element={<ProjectsM />} />
//             <Route path="/Resources" element={<Resources />} />
//           </Routes>

//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { generateToken, messaging } from './notification/firebase';
import { onMessage } from 'firebase/messaging';

import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import LoginPage from './pages/LoginPage';
import DepartmentPredPage from './Components/DepartmentPredPage';
import DepartmentDetails from './Components/DepartmentDetails';
import CostReductionPage from './Components/CostRedPred';
import GisNew from './Components/Gisnew';
import Arya from './Components/arya';
import CompletedPath from './Components/CompletedPath';
import TotalPath from './Components/TotalPath';
import ResourceAllocationPage from './Components/ResourceAllocationPage';
import ConflictPredPage from './Components/ConflictPre';
import Seminar from './Components/Seminar';
import MapWithLine from './Components/MapWithLine';
import MapNew from './Components/MapNew';
import AnamolyDetectionPage from './Components/AnamolyDetection';
import Videos from './Components/Videos';
import News from './Components/News';
import DepartmentPage from './pages/DepartmentPage';
import UserDashboard from './Components/UserDashboard';
import GisMap from './Components/GisMap';
import Register from './pages/Register';
import BiddingPage from './Components/Bidding';
import Gis from './Components/Gis';
import TrainingPage from './Components/Training';
import DashboardPage from './Components/Dashboard';
import BidSystem from './Components/BidSystem';
import TaskManager from './Components/TaskManager';
import Project from './Components/Projects';
import ProjectDetails from './Components/ProjectDetails';
import ChatApp from './Components/Chat';
import DiscussionForum from './Components/Disscuss';
import VideoConferencePage from './pages/VideoConfrencing';
import ProjectsM from './Components/ProjectsM';
import Resources from './Components/Resources';

const App = () => {
  const [resourcesIds, setResourcesIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Initialize Firebase Notifications
    generateToken();
    onMessage(messaging, (payload) => {
      console.log('Notification Received:', payload);
      toast(payload.notification.body, { icon: '🔔' });
    });

    // Fetch data from APIs
    const fetchData = async () => {
      try {
        // Fetch all departments
        const deptResponse = await axios.get(`https://${import.meta.env.VITE_BACKEND}/api/getalldep`);
        const departmentData = deptResponse.data.map(department => ({
          id: department._id,
          name: department.name,
          description: department.description,
        }));
        setDepartments(departmentData);

        // Fetch all projects
        const projResponse = await axios.get(`https://${import.meta.env.VITE_BACKEND}/api/getallprojects`);
        const projectData = projResponse.data.map(project => ({
          id: project._id,
          name: project.name,
          description: project.description,
        }));
        setProjects(projectData);

        // Fetch all resources
        const resResponse = await axios.get(`https://${import.meta.env.VITE_BACKEND}/api/getallresources`);
        const resourceData = resResponse.data.map(resource => ({
          id: resource._id,
          name: resource.name,
          description: resource.description,
        }));
        setResources(resourceData);
        setResourcesIds(resourceData.map(resource => resource.id));

        // Fetch resources by project ID
        const projectResourcesResponse = await axios.get(
          `https://${import.meta.env.VITE_BACKEND}/api/project/6749b789545dcca89c35d67a/resources`
        );
        console.log('Resources by Project ID:', projectResourcesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            style: { border: '1px solid #713200', padding: '16px', color: '#713200' },
          }}
        />
        <div className="flex">
          <Sidebar />
        

          <div className="flex-grow pt-5">
            <Navbar />
            <Routes>
              
              <Route path="/login" element={<LoginPage resource={resourcesIds} />} />
              <Route path="/departmentprediction" element={<DepartmentPredPage />} />
              <Route path="/departmentdetails" element={<DepartmentDetails />} />
              <Route path="/costreduction" element={<CostReductionPage />} />
              <Route path="/gisnew" element={<GisNew />} />
              <Route path="/aryan" element={<Arya />} />
              <Route path="/completedpath" element={<CompletedPath />} />
              <Route path="/totalpath" element={<TotalPath />} />
              <Route path="/reallocate" element={<ResourceAllocationPage />} />
              <Route path="/conflictprediction" element={<ConflictPredPage />} />
              <Route path="/seminar" element={<Seminar />} />
              <Route path="/maps" element={<MapWithLine />} />
              <Route path="/mapsnew" element={<MapNew />} />
              <Route path="/project/:projectId/anamoly" element={<AnamolyDetectionPage />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/news" element={<News />} />
              <Route path="/department" element={<DepartmentPage />} />
              <Route path="/UserDashboard" element={<UserDashboard />} />
              <Route path="/project/:projectId/gis" element={<GisMap />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Bidding" element={<BiddingPage />} />
              <Route path="/Geolocation Interface" element={<Gis />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/BidSystem" element={<BidSystem />} />
              <Route path="/taskManager" element={<TaskManager />} />
              <Route path="/Projects" element={<Project />} />
              <Route path="/Project/:projectId" element={<ProjectDetails />} />
              <Route path="/chat" element={<ChatApp />} />
              <Route path="/discussion" element={<DiscussionForum />} />
              <Route path="/video-conference" element={<VideoConferencePage />} />
              <Route path="/ProjectManagement" element={<ProjectsM />} />
              <Route path="/Resources" element={<Resources />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
