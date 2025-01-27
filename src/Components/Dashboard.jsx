import React from "react";
import Chatbot from "../Components/Chatbot";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FaUser, FaBell, FaTasks } from "react-icons/fa";

const DashboardPage = () => {
  // Data for the bar chart
  const projectProgressData = [
    { name: "Project A", Completed: 70, "In Progress": 30 },
    { name: "Project B", Completed: 50, "In Progress": 50 },
    { name: "Project C", Completed: 80, "In Progress": 20 },
    { name: "Project D", Completed: 40, "In Progress": 60 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6"style={{ backgroundColor: "#101114" }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="bg-gray-800 text-white p-3 rounded-lg w-1/3"
        />
        {/* <div className="flex items-center space-x-4">
          <FaBell className="text-2xl cursor-pointer" />
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
        </div> */}
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-3xl font-bold">10</p>
          <p className="text-gray-400 text-sm">since 1 year</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Resources</h2>
          <p className="text-3xl font-bold">105</p>
          <p className="text-gray-400 text-sm">types of resources</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Budget</h2>
          <p className="text-3xl font-bold">₹12000 cr</p>
          <p className="text-gray-400 text-sm">for 12 projects</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <p className="text-3xl font-bold">450</p>
          <p className="text-gray-400 text-sm">assigned to the team</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress of Projects */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Progress of Projects</h2>
          <BarChart
            width={600}
            height={300}
            data={projectProgressData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" fill="#8884d8" />
            <Bar dataKey="In Progress" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Conflicts */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Conflicts</h2>
          <ul className="space-y-4">
            <li className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold">Conflict with Team A</h3>
              <p className="text-sm text-gray-400">
                Resource delay due to procurement issues.
              </p>
            </li>
            <li className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold">Conflict with Team B</h3>
              <p className="text-sm text-gray-400">
                Unexpected weather delays.
              </p>
            </li>
            <li className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold">Conflict with Team C</h3>
              <p className="text-sm text-gray-400">
                Supply chain interruptions.
              </p>
            </li>
          </ul>
        </div>

        {/* Projects Overview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Projects Overview</h2>
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="p-2">Project</th>
                <th className="p-2">Project Officer</th>
                <th className="p-2">Budget</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Project A</td>
                <td className="p-2">Ramesh</td>
                <td className="p-2">₹5 cr</td>
                <td className="p-2">01-01-2023</td>
                <td className="p-2">Ongoing</td>
              </tr>
              <tr>
                <td className="p-2">Project B</td>
                <td className="p-2">Suresh</td>
                <td className="p-2">₹8 cr</td>
                <td className="p-2">15-02-2023</td>
                <td className="p-2">Completed</td>
              </tr>
              <tr>
                <td className="p-2">Project C</td>
                <td className="p-2">Mukesh</td>
                <td className="p-2">₹7 cr</td>
                <td className="p-2">01-03-2023</td>
                <td className="p-2">In Progress</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Task Management */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Task Management</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Arora Gaur</p>
                <p className="text-sm text-gray-400">Task: Road Making</p>
              </div>
              <p className="text-gray-400">Technician</p>
            </li>
            <li className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Mukesh Kumar</p>
                <p className="text-sm text-gray-400">Task: Inspection</p>
              </div>
              <p className="text-gray-400">Supervisor</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
      <Chatbot />
    </div>
    </div>
    
  );
};

export default DashboardPage;
