import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Modal from "react-modal";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "500px",
    background: "#2d2d2d",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
  },
};

// Random task data generator
const generateRandomTasks = () => {
  const priorities = ["High", "Medium", "Low"];
  const descriptions = [
    "Complete the quarterly report",
    "Fix the server downtime issue",
    "Prepare presentation for stakeholders",
    "Schedule a team meeting",
    "Update project documentation",
  ];
  const names = [
    "Quarterly Report",
    "Server Issue Fix",
    "Stakeholder Presentation",
    "Team Meeting",
    "Project Documentation",
  ];

  const tasks = Array.from({ length: 5 }, (_, id) => ({
    id: id + 1,
    name: names[Math.floor(Math.random() * names.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    assignee: `User ${id + 1}`,
    startDate: new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10),
    dueDate: new Date(
      Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10),
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    completed: Math.random() < 0.5, // Randomly mark tasks as complete or not
    file: null, // Add file property
  }));

  return tasks;
};

// Task Card Component
const TaskCard = ({ task, onDelete, onToggleComplete, onViewDetails }) => {
  const { id, name, description, completed, dueDate, priority, file } = task;

  const data = [
    { name: "Completed", value: completed ? 100 : 0 },
    { name: "Pending", value: completed ? 0 : 100 },
  ];

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const isOverdue = new Date(dueDate) < new Date() && !completed;

  return (
    <div
      className={`flex flex-col justify-between p-4 rounded-lg shadow-lg ${
        isOverdue ? "bg-red-100" : "bg-gray-800"
      } text-gray-200 `}
    >
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm">{description}</p>
        <p className={`text-sm mt-2 ${isOverdue ? "text-red-500" : ""}`}>
          Due: {dueDate} {isOverdue && "(Overdue)"}
        </p>
        <div
          className={`inline-block px-2 py-1 mt-2 text-xs font-bold text-white rounded ${
            priorityColors[priority]
          }`}
        >
          Priority: {priority}
        </div>
        {file && (
          <p className="mt-2 text-sm">
            <a
              href={URL.createObjectURL(file)}
              download={file.name}
              className="text-blue-400 underline"
            >
              Download Attached File
            </a>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <PieChart width={50} height={50}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={15}
            outerRadius={25}
            fill="#8884d8"
            paddingAngle={5}
          >
            <Cell key="completed" fill={completed ? "#4caf50" : "#ff9800"} />
            <Cell key="pending" fill={completed ? "#ff9800" : "#4caf50"} />
          </Pie>
        </PieChart>
        <button
          onClick={() => onViewDetails(task)}
          className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          View Details
        </button>
        <button
          onClick={() => onToggleComplete(id)}
          className={`px-3 py-1 rounded-md ${
            completed ? "bg-green-500" : "bg-yellow-500"
          } text-white`}
        >
          {completed ? "Mark as Pending" : "Mark as Complete"}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main Task Manager Component
const OfficerTasks = () => {
  const [tasks, setTasks] = useState(generateRandomTasks());
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignee: "",
    startDate: "",
    endDate: "",
    priority: "Low",
    file: null, // Add file field to newTask state
  });

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask({
      name: "",
      description: "",
      assignee: "",
      startDate: "",
      endDate: "",
      priority: "Low",
      file: null, // Reset file field
    });
  };

  const handleTaskSubmit = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      completed: false,
      dueDate: newTask.endDate,
    };
    setTasks([...tasks, task]);
    handleModalClose();
  };

  const handleFileChange = (e) => {
    setNewTask({ ...newTask, file: e.target.files[0] });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#101114] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Task Manager</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) =>
              setTasks(tasks.filter((task) => task.id !== id))
            }
            onToggleComplete={(id) =>
              setTasks(
                tasks.map((task) =>
                  task.id === id ? { ...task, completed: !task.completed } : task
                )
              )
            }
            onViewDetails={setSelectedTask}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={customModalStyles}
      >
        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) =>
              setNewTask({ ...newTask, name: e.target.value })
            }
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
            required
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 text-gray-200"
          />
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={newTask.startDate}
              onChange={(e) =>
                setNewTask({ ...newTask, startDate: e.target.value })
              }
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
              required
            />
            <input
              type="date"
              value={newTask.endDate}
              onChange={(e) =>
                setNewTask({ ...newTask, endDate: e.target.value })
              }
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
              required
            />
          </div>
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Task Detail Modal */}
      <Modal
        isOpen={selectedTask !== null}
        onRequestClose={() => setSelectedTask(null)}
        style={customModalStyles}
      >
        {selectedTask && (
          <>
            <h3 className="text-xl font-bold mb-4">{selectedTask.name}</h3>
            <p className="mb-2">{selectedTask.description}</p>
            <p className="mb-2">Assigned to: {selectedTask.assignee}</p>
            <p className="mb-2">Due: {selectedTask.dueDate}</p>
            <p className="mb-2">Priority: {selectedTask.priority}</p>
            {selectedTask.file && (
              <p className="mt-2 text-sm">
                <a
                  href={URL.createObjectURL(selectedTask.file)}
                  download={selectedTask.file.name}
                  className="text-blue-400 underline"
                >
                  Download Attached File
                </a>
              </p>
            )}
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-4 px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OfficerTasks;



