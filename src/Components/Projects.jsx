import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTasks, FaUser,FaCheckCircle,FaTimesCircle } from "react-icons/fa";
const COLORS = ["#0088FE", "#00C49F"];
const role = localStorage.getItem('userRole');


const ProjectCard = ({ id, name, startDate, description, status, tasks = [], workers, onDelete, onEdit  }) => {
  const completed = 50;
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { progressColor: "bg-gray-500", statusColor: "bg-green-800", text: "Completed" };
      case "active":
        return { progressColor: "bg-blue-500", statusColor: "bg-blue-800", text: "Active" };
      case "inactive":
        return { progressColor: "bg-red-500", statusColor: "bg-red-800", text: "Inactive" };
      default:
        return { progressColor: "bg-gray-500", statusColor: "bg-gray-800", text: "Unknown" };
    }
  };

  
  const { progressColor, statusColor, text } = getStatusStyles(status);
  const [showEditModal, setShowEditModal] = useState(false);// Example completion percentage, replace with real data if available
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: 100 - completed },
  ];
  const navigate = useNavigate();
  const handleCardClick = (projectId) => {
    console.log('Navigating to project:', projectId);
    navigate(`/project/${projectId}`);
  };
  return (
    <motion.div
    className="bg-gradient-to-r bg-gray-900 p-6 rounded-2xl shadow-2xl flex flex-col gap-6 group transform transition-all duration-500 ease-in-out relative overflow-hidden"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      backgroundPosition: "100% center",
      transform: "perspective(800px) rotateY(10deg)",
      backgroundColor: "#1e293b", // Darker shade on hover
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={{
      backgroundSize: "200% 200%",
      transform: "perspective(800px) rotateY(0deg)",
    }}
    onClick={() => handleCardClick(id)} // Pass the 'id' as the argument
  >
    {/* Card Header with Glassmorphism Effect */}
    <div className="flex justify-between items-center border-b border-gray-600 pb-3 relative z-10 bg-opacity-60 backdrop-blur-md rounded-lg">
      <h3 className="font-semibold text-xl text-white group-hover:text-yellow-200 transition-all duration-300">{name}</h3>
      <span className={`px-3 py-1 text-sm rounded-md ${statusColor}`}>{text}</span>
    </div>


    {/* Project Info with Soft Hover Animations */}
    <p className="text-gray-300 text-sm hover:text-gray-200 transition-all duration-200">{`Start Date: ${new Date(startDate).toLocaleDateString()}`}</p>
    {/*Showing Id*/}
    <div className="flex items-center justify-between mb-4 text-gray-400">
                  <span>
                    <strong>Project Id:</strong>{" "}
                    {(id)}
                  </span>
                </div>
    <p className="text-gray-300 text-sm hover:text-gray-200 transition-all duration-200">{description}</p>


     {/* Progress Bar */}
     <div className="mt-4">
  <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden shadow-md">
    {/* Colored Progress */}
    <div
      className={`h-full ${progressColor}`}
      style={{
        width: status === "Completed"
          ? "100%"
          : status === "Active"
          ? `${Math.random() * (80 - 50) + 50}%`
          : `${Math.random() * (30 - 10) + 10}%`,
      }}
    ></div>


    {/* Dynamic Percentage */}
    <div className="absolute inset-0 flex items-center justify-center text-sm text-white font-semibold">
      {status === "Completed"
        ? "100%"
        : status === "Active"
        ? `${Math.floor(Math.random() * (80 - 50) + 50)}%`
        : `${Math.floor(Math.random() * (30 - 10) + 10)}%`}
    </div>
  </div>
 
    </div>


    {/* Footer with Dynamic Task and Worker Stats */}
    <div className="flex justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <motion.div className="text-gray-400 group-hover:text-yellow-200 transition-all duration-300">
          <FaTasks />
        </motion.div>
        <p className="text-gray-300 text-sm">{tasks.length} tasks</p>
      </div>


      <div className="flex items-center gap-2">
        <motion.div className="text-gray-400 group-hover:text-yellow-200 transition-all duration-300">
          <FaUser />
        </motion.div>
        <p className="text-gray-300 text-sm">{(workers || []).length} workers</p>
      </div>
     
        {/* Edit and Delete Buttons */}
        <div className="flex gap-2">
        <motion.button
  onClick={(e) => {
    e.stopPropagation(); // Prevents the card click handler
    onEdit(id);          // Trigger the edit handler
  }}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
>
  Edit
</motion.button>

{(role === 'Main Admin') && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Project Deleted!");
              onDelete(id);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300"
          >
            Delete
          </motion.button>)}
        </div>
      </div>
    </motion.div>
  );
};


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);  // State for edit modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    startDate: "",
    description: "",
    departments:[],
    projectAdmin: "",
    workers: [],
    tasks: [],
    status: "active",
    resources: "",
    workerIds: [],
    taskIds: []
  });
  const [updatedProject, setUpdatedProject] = useState({
    name: "",
    description: "",
    departments: [],
    status: "active",
  });
  // Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);


  const fetchProjects = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_BACKEND}/api/getallprojects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };
  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
    );


    fetch(`https://${import.meta.env.VITE_BACKEND}/api/projects/${projectId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete the project');
            }
            console.log(`Project with ID ${projectId} deleted successfully`);
        })
        .catch((error) => {
            console.error('Error deleting project:', error);
        });
};
  const createProject = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_BACKEND}/api/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        fetchProjects(); // Refresh project list
        toast.success("Project created successfully");
        setShowModal(false);
        setNewProject({
          name: "",
          startDate: "",
          description: "",
          departments:[],
          projectAdmin: "",
          workers: [],
          tasks: [],
          status: "active",
          resources: "",
          workerIds: [],
          taskIds: []
        });
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      toast.error("Failed to create project");
    }
  };
 
 
 
  const [projectId, setProjectId] = useState("");  // Store the input project ID
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Fetch the project details based on the project ID
  const fetchProject = async () => {
    if (!projectId.trim()) return; // Don't make the API call if projectId is empty
    try {
      setLoading(true);
      setError(""); // Reset error before the new fetch
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/getprojectbyid/${projectId}`
      );
      // Log the response data to check its structure
      console.log("Response data:", response.data);


      // Assuming the response has 'data.project' and set that as the projectData
      setProjectData(response.data.project); // Correctly set project data
    } catch (err) {
      console.error("Error fetching project:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch project by ID.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleEditProject = (id) => {
    console.log("Editing project ID:", id); // Debugging line
    const projectToEdit = projects.find((project) => project._id === id);
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      setUpdatedProject({
        name: projectToEdit.name,
        description: projectToEdit.description,
        departments: projectToEdit.departments,
        status: projectToEdit.status,
      });
      setShowEditModal(true);
    }
  };
 
  const handleUpdateProject = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/updateproject/${selectedProject._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProject),
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === updatedData._id ? updatedData : project
          )
        );
        toast.success("Project updated successfully!");
        setShowEditModal(false);  // Close the modal after successful update
      } else {
        toast.error("Failed to update project");
      }
    } catch (error) {
      toast.error("Error updating project");
    }
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProject(null);  // Reset selected project
    setUpdatedProject({});  // Optionally reset updated project state
  };
  const [formData, setFormData] = useState({
    project_id: "",
    projectML_id: "",
    department: "",
    task_priority: 0,
    task_complexity: 0,
    available_resources: 0,
    resources_allocated: 0,
    communication_frequency: 0,
    historical_delay: 0,
    expected_completion_time: 0,
    actual_completion_time: 0,
    cost_estimate: 0,
    actual_cost: 0,
    site_location: "",
    latitude: 0,
    longitude: 0,
    project_start_date: "",
    project_end_date: "",
    conflict_indicator: 0,
    cost_reduction_potential: 0,
    cost_reduction_category: "",
    resource_utilization: 0,
    complexity_to_priority_ratio: 0,
    delay_factor: 0,
    adjusted_frequency: 0,
  });


  const [response, setResponse] = useState(null);
 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("date") || name.includes("latitude") || name.includes("longitude") || !isNaN(Number(value))
        ? Number(value) || value
        : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const response = await fetch("http://sangam-c2fm.onrender.com/api/projectMLModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }


      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
   
    <div className="p-6 bg-[#101114] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Project Management</h2>
      {/* Search Bar for Projects */}
      <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search by Project ID"
            value={projectId}  // Use projectId here
            onChange={(e) => setProjectId(e.target.value)}  // Update projectId on change
            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md w-full"
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            onClick={fetchProject} // Trigger the fetchProject function on click
            disabled={loading}
          >
            {loading ? "Fetching..." : "Search"}
          </button>
        </div>
      </div>
     


      {/* Show the fetched project */}
      {projectData ? (
        <div className="mt-6 p-4 bg-gray-800 rounded-md">
          <h3 className="text-xl font-semibold">Project Details</h3>
          <p><strong>Name:</strong> {projectData.name}</p>
          <p><strong>Description:</strong> {projectData.description}</p>
          <p><strong>Departments:</strong> {projectData.departments.join(", ")}</p>
          <p><strong>Status:</strong> {projectData.status}</p>
          <p><strong>Workers:</strong> {projectData.workerIds.join(", ")}</p>
          {/* Render other project details as needed */}
        </div>
      ) : projectId && !loading && !error ? (
        <p className="mt-6 text-red-500">No project found with this ID</p>
      ) : null}


      {/* Button to create a new project */}
      {(role === 'Main Admin') && (
      <motion.button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white mb-4 px-4 py-2 rounded-md hover:bg-green-600 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Create New Project
      </motion.button>)}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              startDate={project.startDate}
              description={project.description}
              departments={project.departments}
              status={project.status}
              tasks={project.taskIds}
              workers={project.workers}
              onDelete={handleDeleteProject}
              onEdit={handleEditProject}
            />
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create New Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Departments (comma-separated)"
              value={newProject.departments.join(", ")}
              onChange={(e) => setNewProject({ ...newProject, departments: e.target.value.split(", ") })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Resources (comma-separated)"
              value={newProject.resources}
              onChange={(e) => setNewProject({ ...newProject, resources: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Project Admin"
              value={newProject.projectAdmin}
              onChange={(e) => setNewProject({ ...newProject, projectAdmin: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Worker IDs (comma-separated)"
              value={newProject.workerIds}
              onChange={(e) => setNewProject({ ...newProject, workerIds: e.target.value.split(",") })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Task IDs (comma-separated)"
              value={newProject.taskIds}
              onChange={(e) => setNewProject({ ...newProject, taskIds: e.target.value.split(",") })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <div className="flex justify-end gap-4">
              <motion.button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                whileHover={{ scale: 1.05 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={createProject}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                whileHover={{ scale: 1.05 }}
              >
                Create Project
              </motion.button>
             
            </div>
          </div>
        </div>
      )}
       {showEditModal && selectedProject && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Edit Project</h3>


      {/* Project Edit Form */}
      <input
        type="text"
        placeholder="Project Name"
        value={updatedProject.name}
        onChange={(e) => setUpdatedProject({ ...updatedProject, name: e.target.value })}
        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={updatedProject.description}
        onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Departments (comma-separated)"
        value={updatedProject.departments.join(", ")}
        onChange={(e) => setUpdatedProject({ ...updatedProject, departments: e.target.value.split(", ") })}
        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
      />
      <select
        value={updatedProject.status}
        onChange={(e) => setUpdatedProject({ ...updatedProject, status: e.target.value })}
        className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="Completed">Completed</option>
       
      </select> 


      {/* Buttons for Cancel and Update */}
      <div className="flex justify-end gap-4">
        <motion.button
          onClick={() => setShowEditModal(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={handleUpdateProject} // Trigger the update function
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
        >
          Update Project
        </motion.button>
      </div>
    </div>
  </div>
)}
      <ToastContainer />
    </div>
  );
};




export default Projects;
