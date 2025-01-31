import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";
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

const TaskManager = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reportUrl, setReportUrl] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTaskId, setSearchTaskId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("Pending");

  const [searchUserId, setSearchUserId] = useState("");
  const [taskReports, setTaskReports] = useState({});
  const role = localStorage.getItem('userRole');
  const [newTask, setNewTask] = useState({
    taskId: "",  // Add taskId here
    title: "",
    description: "",
    assignedTo: "",
    project: "",
    status: "Pending",
    dueDate: "",
  });


  // console.log(taskReports);
  //demo data

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  // Fetch data and populate the state
  const fetchData = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_BACKEND}/admin/getalluser`);
      const jsonData = await response.json();
      setData(jsonData); // Store full data for name-id mapping
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected ID:", selectedId); // Log or handle the selected ID
    // You can now send `selectedId` to your backend or process it as needed
  };

  // console.log(selectedId);




  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  // Fetch names and populate the state
  const fetchNames = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_BACKEND}/api/getallprojects`);
      const jsonData = await response.json();
      setNames(jsonData); // Store full data for name-id mapping
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Fetch names when the component loads
  useEffect(() => {
    fetchNames();
  }, []);



  const openEditModal = (task) => {
    setSelectedTask(task); // Set the task being edited
    setNewStatus(task.status); // Set the current status of the task in the dropdown
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle updating the task's status
  const updateTaskStatus = async () => {
    if (!selectedTask) return; // If no task is selected, do nothing

    try {
      const updatedTask = { ...selectedTask, status: newStatus };
      await axios.patch(
        `https://${import.meta.env.VITE_BACKEND}/api/project/task/${selectedTask._id}`,
        updatedTask
      );
      setIsStatusModalOpen(false); // Close the modal after updating
      fetchAllTasks(); // Refresh tasks list
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/getalltasks`
      );
      setTasks(response.data); // Assuming `data` contains the list of all tasks
    } catch (err) {
      console.error("Error fetching all tasks:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch all tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Other API functions...
  const fetchTaskById = async () => {
    if (!searchTaskId.trim()) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/project/getTaskById/${searchTaskId}`
      );
      setTasks([response.data.task]); // Assuming `task` is returned in the response
    } catch (err) {
      console.error("Error fetching task:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch task by ID.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTasksByProjectId = async () => {
    if (!projectId.trim()) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://${import.meta.env.VITE_BACKEND}/api/project/${projectId}/tasks`
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch tasks by project ID.");
    } finally {
      setLoading(false);
    }
  };

  async function fetchReportByTaskId(taskId) {
    const apiUrl = `https://${import.meta.env.VITE_BACKEND}/api/getreportbytaskid/${taskId}`;
    // console.log(taskId);
    try {
      // Fetch the data from the API
      const response = await fetch(apiUrl);
      // console.log(response);
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Extract and store the report URLs in the state
      if (data.report && data.report.reportUrls) {
        setTaskReports((prevReports) => ({
          ...prevReports,

          [taskId]: data.report.reportUrls,
        }));
      } else {
        throw new Error("Invalid response structure or no report URLs found.");
      }
    } catch (error) {
      console.error("Failed to fetch report:", error);
    }
  }


  const createTask = async () => {
    try {
      setLoading(true);
      setError("");
      await axios.post(
        `https://${import.meta.env.VITE_BACKEND}/api/project/task`,
        newTask
      );
      setNewTask({
        taskId: "",  // Reset taskId
        title: "",
        description: "",
        assignedTo: "",
        project: "",
        status: ['Pending', 'In Progress', 'Completed', 'Submitted'],
        dueDate: "",
      });
      setIsModalOpen(false);
      if (projectId) fetchTasksByProjectId(); // Refresh tasks
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create a new task.");
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
    } else {
      setMessage("Please upload a PNG file.");
    }
  };

  const handleFileUpload = async (e, taskId) => {
    if (!file || file.type !== "image/png") {
      setMessage("Please upload a valid PNG file.");
      return;
    }
    e.preventDefault();
  
    setIsUploading(true);
    setMessage("");
  
    const formData = new FormData();
    formData.append("report", file);
  
    try {
      // Upload the report
      const response = await axios.post(
        `https://${import.meta.env.VITE_BACKEND}/api/uploadtaskreport/${taskId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.data.report) {
        toast.success("Report uploaded successfully!");
  
        // Update the task's status in the backend
        await axios.patch(
          `https://${import.meta.env.VITE_BACKEND}/api/project/task/${taskId}`,
          { status: "Submitted" } // Ensure the backend handles this field
        );
  
        setMessage("Report uploaded successfully and status updated!");
        fetchAllTasks(); // Refresh tasks list to reflect the new status
      } else {
        setMessage("Error uploading report.");
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };
  

  const fetchTasksByUserId = async () => {
    if (!searchUserId.trim()) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://${import.meta.env.VITE_BACKEND}/api/getalltasksbyuserid/${searchUserId}`
      );
      setTasks(response.data.tasks); // Update with fetched tasks
    } catch (err) {
      console.error("Error fetching tasks by user ID:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch tasks by user ID.");
    } finally {
      setLoading(false);
    }
  };
  // console.log(task._id);
  return (
    <div className="p-6 bg-[#101114] min-h-screen text-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Task Manager</h2>

      {/* Search Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search by Task ID */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Task by Task ID"
            value={searchTaskId}
            onChange={(e) => setSearchTaskId(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <button
            onClick={fetchTaskById}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Search by Project ID */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Tasks by Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <button
            onClick={fetchTasksByProjectId}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Search
          </button>
        </div>

        {/* Search by User ID */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Tasks by User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <button
            onClick={fetchTasksByUserId}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Search
          </button>
        </div>

        {/* Fetch All Tasks */}
        <button
          onClick={fetchAllTasks}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Get All Tasks
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Tasks Display */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="relative group p-6 rounded-3xl shadow-xl transform hover:scale-105 bg-gray-900 border border-gray-700 text-gray-100 overflow-hidden"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-gray-700 via-gray-700 to-gray-900 opacity-20 blur-xl group-hover:opacity-50 transition-all duration-500 -z-10"></div>

                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${task.status === "Completed"
                    ? "bg-green-500 text-gray-900"
                    : task.status === "In Progress"
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-red-500 text-gray-900"
                    }`}
                >
                  {task.status}
                </span>

                {/* Task Info */}
                <h3 className="font-extrabold text-2xl bg-gradient-to-r from-white to-yellow-200 text-transparent bg-clip-text mb-4">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-300 mb-6">{task.description}</p>

                {/* Reports Section */}
                {taskReports[task._id]?.length > 0 && (
                  // console.log(taskReports[task._id]),
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">Reports:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {taskReports[task._id].map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            Report {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Due Date */}
                <div className="flex items-center justify-between mb-4 text-gray-400">
                  <span>
                    <strong>Due:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {/*Showing Id*/}
                <div className="flex items-center justify-between mb-4 text-gray-400">
                  <span>
                    <strong>Task Id:</strong>{" "}
                    {(task._id)}
                  </span>
                </div>

                {/* Progress Bar  */}
                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full ${task.status === "Completed" ? "bg-green-500" : task.status === "In Progress" ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{
                      width: task.status === "Completed" ? "100%" :
                        task.status === "In Progress" ? "50%" : "0%"
                    }}
                  ></div>
                </div>
                {

                }

                {/* Upload Section */}

                <div className="mt-4">
                  {(role === 'Worker') && (
                    <>
                      <h4 className="text-lg font-bold mb-2">Upload New Report:</h4>
                      <input
                        type="file"
                        accept=".png"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                      />
                      <button
                        onClick={(e) => handleFileUpload(e, task._id)}
                        onChange={(e) => setNewStatus("Submitted")}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Upload
                      </button>
                    </>
                  )}

                  {(role === 'Main Admin' || role === 'Officer') && (
                  <button
                    onClick={() => {
                      setSelectedTask(task); // Pass the task details to the modal
                      setIsStatusModalOpen(true); // Open the modal
                    }}
                    className="bg-yellow-600 text-white ml-6 px-4 py-2 rounded-md hover:bg-yellow-700"
                  >
                    Update Status
                  </button>)}
                  <button
                    onClick={() => fetchReportByTaskId(task._id)}
                    className="bg-blue-600 text-white ml-6 px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Reports
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No tasks available.</p>
          )}
        </div>
      )}

      {/* Add Task Modal */}
      {(role === 'Main Admin' || role === 'Officer') && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-6"
        >
          Add Task
        </button>)}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
        appElement={document.getElementById("root")}
      >
        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTask();
          }}
        >
          {/* Add Task Fields */}
          <input
            type="text"
            placeholder="Task ID"
            value={newTask.taskId}
            onChange={(e) => setNewTask({ ...newTask, taskId: e.target.value })}
            required
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          {/* <select
            id="username"
            value={selectedId}
            placeholder="Assigned To (User ID)"
            onChange={(e) => setSelectedId({...newTask, assignedTo: e.target.value})}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white"
            
          >
            <option  disabled>
              {data.length === 0 ? 'Loading...' : 'Assigned To (User ID)'}
            </option>
            {data.map((item) => (
              <option className="text-white" key={item._id} value={item._id}>
                {item.username}
              </option>
            ))}
          </select> */}
          <select
            id="username"
            value={newTask.assignedTo} // Use the value from `newTask`
            placeholder="Assigned To (User ID)"
            onChange={(e) => {
              const selectedValue = e.target.value;
              setNewTask((prevTask) => ({
                ...prevTask,
                assignedTo: selectedValue, // Update the `assignedTo` field in `newTask`
              }));
            }}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            <option value="" enable>
              {data.length === 0 ? 'Loading...' : 'Assigned To (User ID)'}
            </option>
            {data.map((item) => (
              <option className="text-white" key={item._id} value={item._id}>
                {item.username}
              </option>
            ))}
          </select>



          <select
            id="name"
            value={newTask.project} // Use the value from `newTask.project`
            onChange={(e) => {
              const selectedValue = e.target.value;
              setNewTask((prevTask) => ({
                ...prevTask,
                project: selectedValue, // Update the `project` field in `newTask`
              }));
            }}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            <option enable value="">
              {names.length === 0 ? 'Loading...' : 'Project ID'}
            </option>
            {names.map((item) => (
              <option className="text-white" key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>


          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Submitted">Submitted</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            required
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isStatusModalOpen}
        onRequestClose={() => setIsStatusModalOpen(false)}
        style={customModalStyles}
        appElement={document.getElementById("root")}
      >
        <h3 className="text-xl font-bold mb-4">Update Task Status</h3>
        {selectedTask && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTaskStatus(selectedTask._id, newStatus);
            }}
          >
            <h4 className="text-lg mb-2">Task: {selectedTask.title}</h4>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </form>
        )}
      </Modal>

    </div>

  );
};

export default TaskManager;