import React, { useState } from 'react';
import { BiBookAlt, BiHome, BiStats, BiTask, BiTrain, BiLogOut, BiCurrentLocation, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage or any other storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/loginn");
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-gray-900 ${
            isCollapsed ? 'w-20' : 'w-64'
          } transition-all duration-300 fixed top-20 left-0 h-[calc(100vh-5rem)] z-10`}
        >
          {/* Logo and Sidebar Toggle */}
          <div className="flex items-center justify-between p-2">
            <button
              onClick={handleToggleSidebar}
              className="text-white text-2xl hover:text-gray-400 transition-colors"
            >
              {isCollapsed ? <BiChevronRight /> : <BiChevronLeft />}
            </button>
          </div>

          {/* Menu List */}
          <div className="mt-8 overflow-y-auto">
            <Link
              to="/"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiHome className="text-2xl" />
              {!isCollapsed && <span>Admin Dashboard</span>}
            </Link>
            <Link
              to="/taskManager"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/taskManager'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiTask className="text-2xl" />
              {!isCollapsed && <span>Tasks</span>}
            </Link>
            <Link
              to="/projects"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/projects'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiBookAlt className="text-2xl" />
              {!isCollapsed && <span>Projects</span>}
            </Link>
            <Link
              to="/resources"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/resources'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiStats className="text-2xl" />
              {!isCollapsed && <span>Resources</span>}
            </Link>
            <Link
              to="/training"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/training'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiTrain className="text-2xl" />
              {!isCollapsed && <span>Training</span>}
            </Link>
            <Link
              to="/gisnew"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/gisnew'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiCurrentLocation className="text-2xl" />
              {!isCollapsed && <span>GeoLocation Interface</span>}
            </Link>
            <Link
              to="/Bidding"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/Bidding'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiCurrentLocation className="text-2xl" />
              {!isCollapsed && <span>Bidding</span>}
            </Link>
            <Link
              to="/department"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/department'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiCurrentLocation className="text-2xl" />
              {!isCollapsed && <span>Department</span>}
            </Link>
            <Link
              to="/costreduction"
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/costreduction'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiCurrentLocation className="text-2xl" />
              {!isCollapsed && <span>Cost Reduction</span>}
            </Link>
            <Link
              to="/loginn"
              onClick={handleLogout}
              className={`flex items-center gap-4 p-5 transition-colors ${
                location.pathname === '/loginn'
                  ? 'bg-gray-700 text-yellow-500'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <BiLogOut className="text-2xl" />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="transition-all duration-300 w-full"
          style={{
            marginLeft: isCollapsed ? '5rem' : '16rem',
            paddingTop: '5rem', // Match the height of the Navbar
          }}
        >
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
