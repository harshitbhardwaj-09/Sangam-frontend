import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";
import {  FaComments, FaVideo } from "react-icons/fa";

import { FaFilePdf, FaFileAlt, FaFileImage, FaCloudUploadAlt } from "react-icons/fa";
const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [files, setFiles] = useState([]); // State to manage uploaded files
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];
  

  const GOOGLE_MAPS_API_KEY = '1274d7780f57033ed9118ea96db99182';
  const taskData = [
    { name: "Allocated", value: 40 },
    { name: "Available", value: 30 },
    { name: "Total", value: 70 },
  ];

  const resourceData = [
    { name: "Allocated", value: 50 },
    { name: "Available", value: 30 },
    { name: "Total", value: 80 },
  ];

  const conflictData = [
    { id: 1, description: "Resource allocation exceeded the limit" },
    { id: 2, description: "Task dependency mismatch in timeline" },
    { id: 3, description: "Budget allocation not sufficient for the scope" },
    { id: 4, description: "Project milestone not achieved on schedule" },
    { id: 5, description: "Lack of communication between teams" },
    { id: 6, description: "Unclear project requirements and scope changes" },

  ];
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
          { method: 'POST' }
        );
        
        if (!res.ok) {
          throw new Error('Failed to fetch location');
        }
  
        const data = await res.json();
        
        if (data.location) {
          const { lat, lng } = data.location;
  
          const locationImage = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x400&markers=color:red|${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  
          setLocation({
            name: "Real-time Location",
            description: "This is a dynamically fetched location.",
            address: `${lat}, ${lng}`,
            mapLink: `https://www.google.com/maps?q=${lat},${lng}`,
            image: locationImage,
          });
        } else {
          console.error('Location data not available');
          setLocation(null);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation(null); // You can show a specific error message on the UI.
      }
    };
  
    fetchLocation();
  }, []);
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

  const filteredDocuments = documents.filter(
    (doc) =>
      (filterTag === "All" || doc.tags.includes(filterTag)) &&
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartMeeting = () => {
    navigate("/video-conference"); // Navigate to the video conference page
  };

  const handleStartMessage = () => {
    navigate("/chat"); // Navigate to the chat page
  };

  return (
    <div className="h-screen bg-[#101114] text-gray-200 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-yellow-500">Project Details</h1>
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
                  className={`py-2 px-4 rounded ${
                    activeTab === tab
                      ? "bg-gray-700 text-yellow-500"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>
              <p>
                Detailed information related to the selected tab:{" "}
                <strong>{activeTab}</strong>.
              </p>
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
                  <p
                    key={index}
                    className="text-gray-300 font-medium"
                  >
                    {item.name}: {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Conflicts Section */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Conflicts</h2>
            <ul>
              {conflictData.map((conflict) => (
                <li key={conflict.id} className="text-red-400">
                  - {conflict.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-6">
          {/* Location and Map Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {location ? (
                <>
                  <img
                    src={location.image}
                    alt="Location"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={() => window.open(location.mapLink, "_blank")}
                    className="text-blue-500 underline"
                  >
                    View on Google Maps
                  </button>
                </>
              ) : (
                <p>Loading location...</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-500">
                {location?.name}
              </h2>
              <p className="mt-2">{location?.description}</p>
              <p className="mt-2 text-sm text-gray-400">
                Address: {location?.address}
              </p>
            </div>
          </div>
            


          {/* Resources Section */}
          <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Resources</h2>
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
                  <p
                    key={index}
                    className="text-gray-300 font-medium"
                  >
                    {item.name}: {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Chat and Video Call Buttons */}
<div className="flex space-x-6 mt-8 justify-center">
  <button
    onClick={handleStartMessage}
    className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition duration-300 ease-in-out transform hover:scale-105 p-4 rounded-full shadow-lg text-white flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-300"
  >
    <FaComments size={26} className="text-white" />
  </button>
  <button
    onClick={handleStartMeeting}
    className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 hover:from-green-500 hover:to-blue-400 transition duration-300 ease-in-out transform hover:scale-105 p-4 rounded-full shadow-lg text-white flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
  >
    <FaVideo size={26} className="text-white" />
  </button>
</div>
</div>
      
      {/* File Management Section */}
      <div className={`${darkMode ? "bg-[#101114] text-white" : "bg-white text-gray-900"} min-h-screen p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Training Page</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Document Management Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
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
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Document</th>
              <th className="py-2 px-4">Uploaded by</th>
              <th className="py-2 px-4">For task</th>
              <th className="py-2 px-4">Tags</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr
                key={index}
                className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}
              >
                <td className="py-2 px-4 flex items-center space-x-2">
                  <span>
                    {doc.type === "PDF" && <FaFilePdf className="text-red-500" />}
                    {doc.type === "DOC" && <FaFileAlt className="text-blue-500" />}
                    {doc.type === "AI" && <FaFileImage className="text-green-500" />}
                  </span>
                  <a
                    href={doc.url}
                    download={doc.name}
                    className="hover:underline text-blue-400"
                  >
                    {doc.name}
                  </a>
                </td>
                <td className="py-2 px-4">{doc.uploader}</td>
                <td className="py-2 px-4">{doc.task}</td>
                <td className="py-2 px-4">{doc.tags.join(", ")}</td>
                <td className="py-2 px-4">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Upload New Document</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const file = e.target.file.files[0];
                const fileUrl = URL.createObjectURL(file); // Generate a temporary URL for downloading
                const newDoc = {
                  name: e.target.name.value,
                  size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
                  uploader: "Admin",
                  task: e.target.task.value,
                  date: new Date().toLocaleDateString(),
                  type: file.name.split(".").pop().toUpperCase(),
                  tags: e.target.tags.value.split(","),
                  url: fileUrl, // Store the generated URL
                };
                addNewDocument(newDoc);
              }}
            >
                          <input
                type="text"
                name="name"
                placeholder="Document Name"
                className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
                required
              />
              <input
                type="text"
                name="task"
                placeholder="Associated Task"
                className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
              />
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.png,.jpg,.jpeg,.ai"
                className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default ProjectDetails;
