import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { FaComments, FaVideo, FaFilePdf, FaFileAlt, FaFileImage, FaCloudUploadAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ProjectDetails = () => {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ProjectId, setProjectId] = useState(null);
  const [reports, setReports] = useState([]);
  const [errorReports, setErrorReports] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [files, setFiles] = useState([]);
  const [resources, setResources] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errortask, setTaskError] = useState("");
  const [errorres, setResError] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterTag, setFilterTag] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(true);


  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];
  const GOOGLE_MAPS_API_KEY = '1274d7780f57033ed9118ea96db99182';
  const navigate = useNavigate();
  const { projectId } = useParams();
  const taskData = [
    { name: "Available", value: 40 },
    { name: "Allocated", value: 30 },
    { name: "Total", value: 70 },
  ];
  const resourceData = [
    { name: "Available", value: 40 },
    { name: "Allocated", value: 30 },
    { name: "Total", value: 70 },
  ];

  const fetchTasksByProjectId = async () => {
    if (!projectId) {
      console.log("No project ID found in the URL");
      return;
    }

    try {
      setLoading(true);
      setTaskError("");
      console.log(`Fetching tasks for project ID: ${projectId}`); // Add this log for debugging

      console.log(import.meta.env.VITE_BACKEND, "backend url");
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/project/${projectId}/tasks`
      );
      console.log("Tasks fetched aryaman successfully:", response.data); // Log the fetched tasks
      setTasks(response.data);
    } catch (err) {
      console.log(err)
      console.error("Error fetching tasks:", err.response?.data || err.message);
      setTaskError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksByProjectId();
  }, [projectId]);

  const fetchResourcesByProjectId = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      setResError("");
      const response = await axios.get(`https://${import.meta.env.VITE_BACKEND}/api/project/${projectId}/resources`);
      setResources(response.data);
      console.log(response.data, "hello vanshika")
    } catch (err) {
      setResError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasksByProjectId();
    fetchResourcesByProjectId();
  }, [projectId]);

  const TaskCard = ({ task }) => {
    return (
      <div className="task-card">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p>Assigned to: {task.assignedTo?.fullName}</p>
      </div>
    );
  };

  const ResourceCard = ({ resource }) => (
    <div className="resource-card">
      <h3>{resource.name}</h3>
      <p>{resource.description}</p>
      <p>Unit: {resource.unit}</p>
      <p>Assigned Quantity: {resource.assignments[0]?.quantity || 0}</p>
    </div>
  );
  console.log('Tasks state in JSX render:', tasks);
  const fetchReports = async () => {
    if (!projectId) {
      console.error("No project ID found.");
      return;
    }

    try {
      const response = await fetch(`https://sangam-c2fm.onrender.com/api/getReportByProjectId/${projectId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();

      // Log the entire data object to inspect its structure
      console.log("API Response:", data);

      // Check if reports are in `data.reports` or `data.reportUrls`
      if (Array.isArray(data.reports)) {
        setReports(data.reports);  // Assuming reports are an array
      } else if (Array.isArray(data.reportUrls)) {
        setReports(data.reportUrls);  // Assuming reportUrls are the report links
      } else {
        setReports([]);  // If neither are an array or data is malformed
      }

      console.log("Reports fetched successfully", data);  // Log the entire response for debugging
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);  // Ensure reports state is empty on error
    }
  };
  const handleNavigateToAnamolyDet = () => {
    if (!projectId) {
      console.error("No project ID found in the URL.");
      return;
    }
    console.log("Navigating to GIS Map for project ID:", projectId);
    navigate(`/project/${projectId}/anamoly`);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
    } else {
      setMessage('Please upload a PNG file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PNG file to upload.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('report', file);

    const url = `https://${import.meta.env.VITE_BACKEND}/api/uploadProjectReport/${projectId}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setMessage(`File uploaded successfully! Report URL: ${data.reportUrl}`);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }

    setIsLoading(false);
  };
  const filteredDocuments = documents.filter(
    (doc) =>
      (filterTag === "All" || doc.tags.includes(filterTag)) &&
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const conflictData = [
    { id: 1, description: "Resource allocation exceeded the limit" },
    { id: 2, description: "Task dependency mismatch in timeline" },
    { id: 3, description: "Budget allocation not sufficient for the scope" },
    { id: 4, description: "Project milestone not achieved on schedule" },
    { id: 5, description: "Lack of communication between teams" },
    { id: 6, description: "Unclear project requirements and scope changes" },
  ];
  const handleNavigateToGisMap = () => {
    if (!projectId) {
      console.error("No project ID found in the URL.");
      return;
    }
    console.log("Navigating to GIS Map for project ID:", projectId);
    // navigate(`/project/${projectId}/gis`);
    navigate('/maps')
  };

  const handleButtonClick = () => {
    navigate("/conflictprediction"); // Navigates to the AboutPage
  };

  const handleButtonOnClick = () => {
    navigate("/departmentprediction"); // Navigates to the AboutPage
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleFileDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url); // Cleanup
  };

  const addNewDocument = (newDoc) => {
    setDocuments([...documents, newDoc]);
    setShowUploadModal(false);
  };


  const handleStartMeeting = () => {
    navigate("/video-conference"); // Navigate to the video conference page
  };

  const handleStartMessage = () => {
    navigate("/chat"); // Navigate to the chat page
  };


  useEffect(() => {
    const fetchReports = async () => {
      if (!projectId) {
        console.error("No project ID found.");
        return;
      }

      try {
        const response = await fetch(`https://sangam-c2fm.onrender.com/api/getReportByProjectId/${projectId}`);

        // Checking if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();

        // Check if data has a nested 'report' object
        if (data.report) {
          // If 'reportUrl' exists inside 'report', handle it
          if (data.report.reportUrl) {
            setReports([data.report.reportUrl]); // Wrap the single URL in an array
          } else {
            console.warn("No report URL found in the report object", data);
            setReports([]); // Handle case where 'reportUrl' is missing
          }
        } else {
          console.warn("Unexpected response format: 'report' object is missing", data);
          setReports([]);  // Handle case where 'report' is missing
        }

        console.log("Reports fetched successfully", data.report);  // Success log
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReports([]);  // Ensure reports state is empty on error
      }
    };

    fetchReports();
  }, [projectId]);
  return (
    <div className="h-screen bg-[#101114] text-gray-200 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-yellow-500">Project Details</h1>
        <button
        className="bg-gradient-to-r from-green-400 mt-16 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 absolute top-6 right-6"
        onClick={handleNavigateToAnamolyDet}
      >
        Go to Anomaly Detection
      </button>

        
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Section */}
        <div className="flex flex-col space-y-6">
          {/* Tabs Section */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <div className="flex justify-around mb-4">
              {["Overview", "Guidelines", "Timeline", "Budget"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded ${activeTab === tab
                      ? "bg-gray-700 text-yellow-500"
                      : "bg-gray-800 text-gray-400"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>
              {activeTab === "Overview" && (
      <p>
        The road construction project aims to enhance connectivity and support local development by constructing a 15-kilometer stretch of highway. It focuses on sustainable methods, efficient resource utilization, and adherence to safety and quality standards.
      </p>
    )}
    {activeTab === "Guidelines" && (
      <p>
        The project will follow regulatory compliance, ensure minimal environmental impact, and maintain strict timelines. Safety measures for workers and the public will be prioritized throughout all phases.
      </p>
    )}
    {activeTab === "Timeline" && (
      <p>
        The project is planned over six months, with phases including site preparation, road foundation, paving, and final inspection, ensuring timely and high-quality delivery.
      </p>
    )}
    {activeTab === "Budget" && (
      <p>
        The estimated budget is INR 50 crore, allocated for land acquisition (40%), materials (35%), labor (20%), and contingencies (5%).
      </p>
    )}
            </div>
          </div>
          {/* Task Progress */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Task Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={taskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                      dataKey="value"
                    >
                      {taskData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center">
                {taskData.map((item, index) => (
                  <p key={index} className="text-gray-300 font-medium">
                    {item.name}: {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks Cards Section */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Tasks</h2>
            {loading ? (
              <p className="text-yellow-400">Loading tasks...</p>
            ) : errortask ? (
              <p className="text-red-400">{errortask}</p>
            ) : tasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-gray-700 p-4 rounded shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-yellow-500">{task.title}</h3>
                    <p className="text-sm text-gray-300">{task.description}</p>
                    <p className="text-sm text-gray-400">Status: {task.status}</p>
                    <p className="text-sm text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Assigned to: {task.assignedTo?.fullName || "Unassigned"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No tasks available for this project.</p>
            )}
          </div>
          <button className=" bg-yellow-500 m-4 p-2 shadow-lg rounded-lg" onClick={handleButtonClick}>Conflict Prediction</button>
          <button className=" bg-red-500 m-4 p-2 shadow-lg rounded-lg" onClick={handleButtonOnClick}>Deprtment Conflict Prediction</button>


        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-6">
          {/* Location and Map Section */}
          {/* Location Card */}
          
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
            onClick={handleNavigateToGisMap}
          >
            <h2 className="text-xl font-semibold text-yellow-500">
              Navigate to GIS Map
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Click this card to view GIS Map details.
            </p>
            {/* <button className=" bg-green-500 m-4 p-2 shadow-lg rounded-lg">Completed Paths</button>
            <button className=" bg-blue-500 m-4 p-2 shadow-lg rounded-lg">Progress & Conflicts</button> */}

          </div>  

          {/* Resource Progress */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Resource Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                      dataKey="value"
                    >
                      {resourceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center">
                {resourceData.map((item, index) => (
                  <p key={index} className="text-gray-300 font-medium">
                    {item.name}: {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {/* Resources Section */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Resources</h2>
            {loading ? (
              <p className="text-yellow-400">Loading resources...</p>
            ) : errorres ? (
              <p className="text-red-400">{errorres}</p>
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <div
                    key={resource._id}
                    className="bg-gray-700 p-4 rounded shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-yellow-500">{resource.name}</h3>
                    <p className="text-sm text-gray-300">{resource.description}</p>
                    <p className="text-sm text-gray-400">Unit: {resource.unit}</p>
                    <p className="text-sm text-gray-400">
                      Assigned Quantity: {resource.assignments[0]?.quantity || 0}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No resources available for this project.</p>
            )}
          </div>


          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-6">
            <button
              className="bg-yellow-500 text-gray-800 p-6 rounded-lg text-2xl flex flex-col items-center justify-center shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300"
              onClick={handleStartMeeting}
            >
              <FaVideo className="text-white mb-2" size={30} />
              <span className="text-white font-medium">Start Meeting</span>
            </button>
            <button
              className="bg-green-500 text-gray-800 p-6 rounded-lg text-2xl flex flex-col items-center justify-center shadow-lg hover:bg-green-400 transform hover:scale-105 transition-all duration-300"
              onClick={handleStartMessage}
            >
              <FaComments className="text-white mb-2" size={30} />
              <span className="text-white font-medium">Start Message</span>
            </button>
            <button
              className="bg-blue-500 text-gray-800 p-6 rounded-lg text-2xl flex flex-col items-center justify-center shadow-lg hover:bg-blue-400 transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowUploadModal(true)}
            >
              <FaCloudUploadAlt className="text-white mb-2" size={30} />
              <span className="text-white font-medium">Upload File</span>
            </button>

          </div>
        </div>
      </div>

      {/* Modal for uploading documents */}
      {/* Document Management Section */}
      {/* Document Management Section */}
      <div className="bg-gray-800 rounded-lg p-6 m-6 shadow-lg mb-6">
        {/* Filters */}
        <div className="flex justify-between items-center  mb-4">
          <div className="flex items-center space-x-4 ">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white rounded-lg p-2"
            />
            <select
              className="bg-gray-700 text-white rounded-lg p-2"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option>All</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Policy</option>
            </select>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => setShowUploadModal(true)}
          >
            <FaCloudUploadAlt /> <span>Add Document</span>
          </button>
        </div>

        {/* Document List */}

      </div>


      {/* Reports Section */}
      <div className="bg-gray-800 rounded-lg p-6 m-6 shadow-lg mb-6">
        <h2 className="text-2xl text-white mb-4">Reports</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Report Name</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-4 text-center text-gray-400">No reports available</td>
              </tr>
            ) : (
              reports.map((reportUrl, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">
                    <a href={reportUrl} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      View Report {index + 1}
                    </a>
                  </td>
                  <td className="py-2 px-4">{new Date().toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Upload New Document</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="reportFile" className="block text-sm font-medium text-gray-700">
                  Choose PNG Report File
                </label>
                <input
                  type="file"
                  id="report"
                  name="report"
                  accept=".png"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </form>

            {/* Display message */}
            {message && (
              <div
                className={`mt-4 p-2 rounded-md text-center ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
              >
                {message}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="mt-4 text-white bg-red-600 rounded-lg px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;