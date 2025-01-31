// import { useState } from "react";
// import DepartmentForm from "../Components/DepartmentForm";
// import DepartmentList from "../Components/DepartmentList";

// const DepartmentPage = () => {
//   const [departments, setDepartments] = useState([]);
//   const [search, setSearch] = useState("");

//   const addDepartment = async (name) => {
//     try {
//       // API call to add a department
//       const response = await fetch(
//         "https://backend-code-4-nnid.onrender.com/api/createDepartment",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create department.");
//       }

//       const newDepartment = await response.json();

//       // Update the departments state with the new department
//       setDepartments([...departments, newDepartment.name]);
//     } catch (error) {
//       console.error("Error adding department:", error.message);
//       alert(error.message); // Notify user about the error
//     }
//   };

//   const editDepartment = (index, newName) => {
//     const updatedDepartments = departments.map((dept, i) =>
//       i === index ? newName : dept
//     );
//     setDepartments(updatedDepartments);
//   };

//   const deleteDepartment = (index) => {
//     const updatedDepartments = departments.filter((_, i) => i !== index);
//     setDepartments(updatedDepartments);
//   };

//   const filteredDepartments = departments.filter((department) =>
//     department.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#101114]  flex flex-col items-center">
//       {/* Search Bar in Top Right Corner */}
//       <div className="absolute top-6 right-6 w-full max-w-md">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search departments..."
//           className="w-full p-3 border border-[#101114]-400 rounded-md"
//         />
//       </div>

//       {/* Single Add New Department Form */}
//       <div className="w-full max-w-4xl p-8 bg-[#101114] shadow-lg rounded-xl  mt-16">
    

//         <DepartmentForm onAddDepartment={addDepartment} />
//       </div>

//       {/* Department List */}
//       <DepartmentList
//         departments={filteredDepartments}
//         onEditDepartment={editDepartment}
//         onDeleteDepartment={deleteDepartment}
//       />
//     </div>
//   );
// };

// export default DepartmentPage;


import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const COLORS = ["#0088FE", "#00C49F"];

      
const Loginn = ({resourcesIds}) => {
  const [showModal, setShowModal] = useState(false);
  

  return (
  <div className="p-6 bg-[#101114] min-h-screen text-white">

      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </div>

      

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Log-In</h3>
            <input
              type="text"
              placeholder="Email Address"
            //   value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4 w-full"
            />
            <input
              type="password"
              placeholder="Password"
            //   value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
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
                // onClick={createProject}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Log-In
              </motion.button>
              
            </div>
            <motion.button
                // onClick={createProject}
                className="w-full text-left text-xs mt-2"
                // whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Create New Account
              </motion.button>
          </div>
        </div>
      )}


      <ToastContainer />
    </div>
  );
};

export default Loginn;
