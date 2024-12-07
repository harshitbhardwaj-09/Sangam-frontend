import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const COLORS = ["#0088FE", "#00C49F"];

const ProjectCard = ({ id, name, startDate, description, status, tasks = [], workers, onDelete }) => {
  const completed = 50; // Example completion percentage, replace with real data if available
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: 100 - completed },
  ];

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-white">{name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            status === "active" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {status}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{`Start Date: ${new Date(startDate).toLocaleDateString()}`}</p>
      <p className="text-gray-400 text-sm">{description}</p>
      <p className="text-gray-400 text-sm">{`${tasks.length} tasks allocated`}</p>
      <div className="flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <PieChart width={80} height={80}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={35} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </motion.div>
        <motion.button
          onClick={() => {
            toast.success("Project Deleted!");
            onDelete(id);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProjectsM = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    startDate: "",
    description: "",
    projectAdmin: "",
    workers: [],
    tasks: [],
    status: "active",
  });

  // Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://backend-code-4-nnid.onrender.com/api/getallprojects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  const createProject = async () => {
    try {
      const response = await fetch("https://backend-code-4-nnid.onrender.com/api/project", {
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
          projectAdmin: "",
          workers: [],
          tasks: [],
          status: "active",
        });
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project._id !== id));
  };

  return (
  <div className="p-6 bg-[#101114] min-h-screen text-white">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Project Management</h2>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Create New Project
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              startDate={project.startDate}
              description={project.description}
              status={project.status}
              tasks={project.taskIds}
              workers={project.workers}
              onDelete={handleDeleteProject}
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
              onChange={(e) => setNewProject({ ...newProject, workerIds: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Task IDs (comma-separated)"
              value={newProject.taskIds}
              onChange={(e) => setNewProject({ ...newProject, taskIds: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <div className="flex justify-end gap-4 mt-4">
              <motion.button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={createProject}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Project
              </motion.button>
            </div>
          </div>
        </div>
      )}


      <ToastContainer />
    </div>
  );
};

export default ProjectsM;
