// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from React Router
// // import Sangam from "../assets/Sangam.jpeg";
// // import Sang from "../assets/Sangam bg.png";
// import sung from "../assets/sangamn.png";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-800 text-white shadow-md p-2 flex items-center justify-between fixed top-0 left-0 w-full z-50">
//       {/* Left Logo */}
//       <div className="flex items-center ml-5">
//         <img
//           src={sung}
//           alt="Left Logo"
//           className="h-16 w-50 object-cover"
//         />
//       </div>

//       {/* Center Logo */}
//       {/* <div className="flex items-center ml-2">
//         <img
//           src={Sang}
//           alt="Center Logo"
//           className="h-16 w-auto"
//         />
//       </div> */}

//       {/* Right Side (Links, Notifications, and Profile) */}
//       <div className="flex items-center space-x-6">
//       <div className="flex items-center space-x-6">
//   {/* Login Link */}
//   <Link
//     to="/login"
//     className="text-white hover:underline hover:text-gray-400"
//   >
//     Login
//   </Link>

//   {/* Register Link */}
//   {/* <Link
//     to="/register"
//     className="text-white hover:underline hover:text-gray-400"
//   >
//     Register
//   </Link> */}
// </div>

//         {/* Notification Icon */}
//         <button className="relative">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="h-7 w-7"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.97 7 11v3.159c0 .417-.154.823-.405 1.145L5 17h5m5 0a3 3 0 11-6 0m6 0H9"
//             />
//           </svg>
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
//             3
//           </span>
//         </button>

//         {/* Profile Picture */}
//         <div className="flex items-center">
//           <img
//             src="your-profile-pic-url-here"
//             alt="User Profile"
//             className="h-10 w-10 rounded-full border-2 border-white"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;







































//demo working code
import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import sung from "../assets/newlogo.svg";
import profile from "../assets/newone.png";
import logo from "../assets/sangamLogo.svg";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  return (

    <>
      {showModal && (
        <div className="p-6 bg-[#101114] min-h-screen text-white">
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-xl text-white font-semibold mb-4">Log-In</h3>
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
              className="w-full text-white text-left text-xs mt-2"
              // whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create New Account
            </motion.button>
          </div>
        </div>
        </div>
      )}


      <ToastContainer />




      <nav className="bg-gray-800 text-white shadow-md p-2 flex items-center justify-between fixed top-0 left-0 w-full z-50">
        {/* Left Logo */}
        <div className="flex items-center mt-2">

          <img
            src={sung}
            alt="Left Logo"
            className="h-16 w-60 object-cover"
          />
         
        </div>
        {/* <input
          type="text"
          placeholder="Search here..."
          className="bg-black-800 text-white p-3  rounded-lg w-900"
        /> */}




        {/* Right Side (Links, Notifications, and Profile) */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6">
          
            {/* Login Link */}
            {/* <motion.button
              onClick={() => setShowModal(true)}
              className="text-white hover:underline hover:text-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button> */}
          </div>

          {/* Notification Icon */}
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.97 7 11v3.159c0 .417-.154.823-.405 1.145L5 17h5m5 0a3 3 0 11-6 0m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </button>

          {/* Profile Picture */}
          <div className="flex items-center">
            <img
              src={profile}
              alt="User Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </nav>



    </>


  );
};

export default Navbar;
