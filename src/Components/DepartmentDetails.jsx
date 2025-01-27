import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";


const DepartmentDetails = () => {
  const { id } = useParams(); // Get department ID from URL
  const location = useLocation(); // Get department name from navigation state
  const departmentName = location.state?.name || "Department";


  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);






  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectResponse = await fetch("https://sangam-c2fm.onrender.com/api/getallprojects");
        const userResponse = await fetch("https://sangam-c2fm.onrender.com/admin/getalluser");


        if (!projectResponse.ok || !userResponse.ok) {
          throw new Error("Failed to fetch data");
        }


        const projectsData = await projectResponse.json();
        const usersData = await userResponse.json();


        // Limit to 5 projects and users
        setProjects(projectsData.slice(0, 5));
        setUsers(usersData.slice(0, 5));


      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);


  return (
    <div className="bg-gradient-to-br from-[#101114] via-[#181a25] to-[#101114] min-h-screen p-6">
  <ToastContainer />
  <div className="max-w-6xl mx-auto">
    <h2 className="text-5xl font-extrabold text-white mb-8 border-b border-gray-600 pb-3">
      {departmentName}
    </h2>


    {loading ? (
      <div className="flex justify-center items-center h-[50vh]">
        <FaSpinner className="animate-spin text-white text-6xl" />
      </div>
    ) : (
      <>
        {/* Projects Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-white mb-6">
            Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-r from-[#4a6ea7] via-[#5a7cbf] to-[#4a6ea7] p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <h4 className="text-xl font-bold text-white mb-2">
                    {project.name}
                  </h4>
                  <p className="text-gray-200">{project.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No projects available.</p>
            )}
          </div>
        </div>


        {/* Users Section */}
        <div>
          <h3 className="text-3xl font-semibold text-white mb-6">Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gradient-to-r from-[#4d8c5d] via-[#5d9f6d] to-[#4d8c5d] p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <h4 className="text-xl font-bold text-white mb-2">
                    {user.username || user.name} {/* Use 'username' if available, otherwise fallback to 'name' */}
                  </h4>
                  <p className="text-gray-200">{user.email}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No users available.</p>
            )}
          </div>
        </div>
      </>
    )}
  </div>
</div>


  );
};


export default DepartmentDetails;


