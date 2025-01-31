import React, { useState } from "react";
import Modal from "react-modal";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1E293B", // Dark mode modal background
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Road Construction",
      description: "Construction of road between Ghaziabad and Dasna.",
      projectHead: "Ramesh",
      status: "Ongoing",
      team: ["John", "Doe", "Alice", "Bob"],
    },
    {
      id: 2,
      name: "Bridge Construction",
      description: "Bridge over Yamuna River.",
      projectHead: "Suresh",
      status: "Completed",
      team: ["Eve", "Charlie", "Mallory"],
    },
    {
      id: 3,
      name: "School Building",
      description: "Construction of a school in Noida.",
      projectHead: "Kavita",
      status: "Pending",
      team: ["Anna", "Chris", "Sam"],
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    projectHead: "",
    status: "Ongoing",
    team: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null); // Store selected project for viewing

  const handleAddProject = () => {
    if (newProject.name && newProject.description && newProject.projectHead) {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          ...newProject,
          team: newProject.team.split(",").map((member) => member.trim()),
        },
      ]);
      setNewProject({
        name: "",
        description: "",
        projectHead: "",
        status: "Ongoing",
        team: "",
      });
      setIsModalOpen(false);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedProjects = (status) =>
    filteredProjects.filter((project) => project.status === status);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true); // Open modal to view detailed project info
  };
  const handleUpdateProject = async () => {
    const updatedProject = {
      name: selectedProject.name,
      status: selectedProject.status,
      departments: selectedProject.departments,
      startDate: selectedProject.startDate,
      endDate: selectedProject.endDate,
    };

    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_BACKEND}/api/updateproject/${selectedProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === selectedProject.id ? updatedData : project
          )
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditModal(true); // Switch to edit modal
    setIsModalOpen(true);
  };
  return (
    <div className="bg-[#101114] min-h-screen p-8 text-gray-100">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Projects"
            className="px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </header>

      <section>
        <ProjectSection
          title="Ongoing Projects"
          projects={categorizedProjects("Ongoing")}
          handleEditProject={handleEditProject}
        />
        <ProjectSection
          title="Completed Projects"
          projects={categorizedProjects("Completed")}
          handleEditProject={handleEditProject}
        />
        <ProjectSection
          title="Pending Projects"
          projects={categorizedProjects("Pending")}
          handleEditProject={handleEditProject}
        />
      </section>


      {/* Modal for Viewing Detailed Project */}
      {selectedProject && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customModalStyles}
          ariaHideApp={false}
        >
          <h2 className="text-xl font-bold mb-4">{selectedProject.name}</h2>
          <p className="text-gray-400">{selectedProject.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            <strong>Project Head:</strong> {selectedProject.projectHead}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Team:</strong> {selectedProject.team.join(", ")}
          </p>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for Adding Projects */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
        ariaHideApp={false}
      >
        
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Project Head"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={newProject.projectHead}
            onChange={(e) => setNewProject({ ...newProject, projectHead: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={newProject.status}
            onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="text"
            placeholder="Team (comma-separated)"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            value={newProject.team}
            onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
      </Modal>
    </div>
  );
}

function ProjectSection({ title, projects, handleViewProject }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} handleViewProject={handleViewProject} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, handleViewProject }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <h3 className="text-lg font-bold text-white">{project.name}</h3>
      <p className="text-gray-400">{project.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        <strong>Project Head:</strong> {project.projectHead}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Team:</strong> {project.team.join(", ")}
      </p>
      <button
        onClick={() => handleViewProject(project)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        View Project
      </button>
    </div>
  );
}

export default Projects;
