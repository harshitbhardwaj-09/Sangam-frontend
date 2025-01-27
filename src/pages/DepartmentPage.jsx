// // import { useState } from "react";
// // import DepartmentForm from "../Components/DepartmentForm";
// // import DepartmentList from "../Components/DepartmentList";

// // const DepartmentPage = () => {
// //   const [departments, setDepartments] = useState([]);
// //   const [search, setSearch] = useState("");

// //   const addDepartment = async (name) => {
// //     try {
// //       // API call to add a department
// //       const response = await fetch(
// //         "https://backend-code-4-nnid.onrender.com/api/createDepartment",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ name }),
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || "Failed to create department.");
// //       }

// //       const newDepartment = await response.json();

// //       // Update the departments state with the new department
// //       setDepartments([...departments, newDepartment.name]);
// //     } catch (error) {
// //       console.error("Error adding department:", error.message);
// //       alert(error.message); // Notify user about the error
// //     }
// //   };

// //   const editDepartment = (index, newName) => {
// //     const updatedDepartments = departments.map((dept, i) =>
// //       i === index ? newName : dept
// //     );
// //     setDepartments(updatedDepartments);
// //   };

// //   const deleteDepartment = (index) => {
// //     const updatedDepartments = departments.filter((_, i) => i !== index);
// //     setDepartments(updatedDepartments);
// //   };

// //   const filteredDepartments = departments.filter((department) =>
// //     department.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-[#101114]  flex flex-col items-center">
// //       {/* Search Bar in Top Right Corner */}
// //       <div className="absolute top-6 right-6 w-full max-w-md">
// //         <input
// //           type="text"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           placeholder="Search departments..."
// //           className="w-full p-3 border border-[#101114]-400 rounded-md"
// //         />
// //       </div>

// //       {/* Single Add New Department Form */}
// //       <div className="w-full max-w-4xl p-8 bg-[#101114] shadow-lg rounded-xl  mt-16">
    

// //         <DepartmentForm onAddDepartment={addDepartment} />
// //       </div>

// //       {/* Department List */}
// //       <DepartmentList
// //         departments={filteredDepartments}
// //         onEditDepartment={editDepartment}
// //         onDeleteDepartment={deleteDepartment}
// //       />
// //     </div>
// //   );
// // };

// // export default DepartmentPage;


// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const COLORS = ["#0088FE", "#00C49F"];

// const ProjectCard = ({ id, name, startDate, description, status, tasks = [], workers, onDelete }) => {
//   const completed = 50; // Example completion percentage, replace with real data if available
//   const data = [
//     { name: "Completed", value: completed },
//     { name: "Pending", value: 100 - completed },
//   ];

//   return (
//     <motion.div
//       className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 group"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-lg text-white">Deparment Name</h3>
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-bold ${
//             status === "active" ? "bg-green-500" : "bg-red-500"
//           } text-white`}
//         >
//           {status}
//         </span>
//       </div>
//       {/* <p className="text-gray-400 text-sm">{`Start Date: ${new Date(startDate).toLocaleDateString()}`}</p> */}
//       <p className="text-gray-400 text-sm">Department Description</p>
//       {/* <p className="text-gray-400 text-sm">{`${tasks.length} tasks allocated`}</p> */}
//       <div className="flex justify-between items-center">
//         {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//           <PieChart width={80} height={80}>
//             <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={35} fill="#8884d8">
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </motion.div> */}
//         <motion.button
//           onClick={() => {
//             toast.success("Project Deleted!");
//             onDelete(id);
//           }}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Delete
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// const DepartmentPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newProject, setNewProject] = useState({
//     name: "",
//     startDate: "",
//     description: "",
//     projectAdmin: "",
//     workers: [],
//     tasks: [],
//     status: "active",
//   });

//   // Fetch Projects
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch("https://sangam-c2fm.onrender.com/api/getallprojects");
//       const data = await response.json();
//       setProjects(data);
//     } catch (error) {
//       toast.error("Failed to fetch projects");
//     }
//   };

//   const createProject = async () => {
//     try {
//       const response = await fetch("https://sangam-c2fm.onrender.com/api/project", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProject),
//       });
//       if (response.ok) {
//         fetchProjects(); // Refresh project list
//         toast.success("Project created successfully");
//         setShowModal(false);
//         setNewProject({
//           name: "",
//           startDate: "",
//           description: "",
//           projectAdmin: "",
//           workers: [],
//           tasks: [],
//           status: "active",
//         });
//       } else {
//         toast.error("Failed to create project");
//       }
//     } catch (error) {
//       toast.error("Failed to create project");
//     }
//   };

//   const handleDeleteProject = (id) => {
//     setProjects(projects.filter((project) => project._id !== id));
//   };

//   return (
//   <div className="p-6 bg-[#101114] min-h-screen text-white">

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold">All Department</h2>
//         <motion.button
//           onClick={() => setShowModal(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Add New Department
//         </motion.button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <ProjectCard
//               key={project._id}
//               id={project._id}
//               name={project.name}
//               startDate={project.startDate}
//               description={project.description}
//               status={project.status}
//               tasks={project.taskIds}
//               workers={project.workers}
//               onDelete={handleDeleteProject}
//             />
//           ))
//         ) : (
//           <p>No projects available</p>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">Add New Department</h3>
//             <input
//               type="text"
//               placeholder="Department Name"
//               value={newProject.name}
//               onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
//               className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
//             />
//             <textarea
//               placeholder="Description"
//               value={newProject.description}
//               onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//               className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
//             />
            
//             <div className="flex justify-end gap-4 mt-4">
//               <motion.button
//                 onClick={() => setShowModal(false)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Cancel
//               </motion.button>
//               <motion.button
//                 onClick={createProject}
//                 className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Create Department
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       )}


//       <ToastContainer />
//     </div>
//   );
// };

// export default DepartmentPage;


import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DepartmentDetails from "../Components/DepartmentDetails";


  

  const DepartmentCard = ({ id, name, description }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(id);
    navigate(`/DepartmentDetails/`);
  };

  return (
    <motion.div
    onClick={handleCardClick}
    className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-4 cursor-pointer group transform transition-all duration-500 ease-in-out relative overflow-hidden hover:shadow-xl"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex justify-between items-center border-b border-gray-700 pb-3">
      <h3 className="font-semibold text-xl text-white">{name}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </motion.div>
  );
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
  });

  // Fetch Departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setFilteredDepartments(
      departments.filter((department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, departments]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/getalldep`
      );
      setDepartments(response.data);
    } catch (error) {
      toast.error("Failed to fetch departments");
    }
  };

  const createDepartment = async () => {
    if (!newDepartment.name.trim() || !newDepartment.description.trim()) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      const response = await axios.post(
        `https://${import.meta.env.VITE_BACKEND}/api/createDepartment`,
        newDepartment
      );
      if (response.status === 200) {
        fetchDepartments(); // Refresh the department list
        toast.success("Department created successfully! 🎉", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setShowModal(false); // Close the modal
        setNewDepartment({ name: "", description: "" }); // Reset form fields
      }
    } catch (error) {
      toast.error("Failed to create department. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div className="p-6 bg-[#101114] min-h-screen text-white">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Department Management</h2>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Create New Department
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Departments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-700 rounded-md"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((department) => (
            <DepartmentCard
  key={department._id}
  id={department._id} // Correct field: _id
  name={department.name}
  description={department.description}
/>
          ))
        ) : (
          <p className="text-gray-400">No departments available</p>
        )}
      </div>

      {/* Create Department Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Create New Department</h3>
            <input
              type="text"
              placeholder="Department Name"
              value={newDepartment.name}
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, name: e.target.value })
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md mb-4"
            />
            <textarea
              placeholder="Description"
              value={newDepartment.description}
              onChange={(e) =>
                setNewDepartment({
                  ...newDepartment,
                  description: e.target.value,
                })
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={createDepartment}
                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
