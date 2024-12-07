import React, { useState } from 'react';

const Task = ({ id, name, completed, onToggleComplete, onDelete }) => {
  return (
    <div className="border p-4 mb-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">{name}</span>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleComplete(id)}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-2 border-t pt-2">
        <p className="text-sm text-gray-600">Task Name: {name}</p>
        <p className="text-sm text-gray-600">Phone Number: </p>
        <p className="text-sm text-gray-600">Time: </p>
      </div>
    </div>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: false },
    { id: 3, name: 'Task 3', completed: false },
  ]);

  const [taskName, setTaskName] = useState('');

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (taskName.trim() === '') return;
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: taskName, completed: false },
    ]);
    setTaskName(''); // Clear the input field
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const currentTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100">
      {/* Side by Side Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Add Task and Current Tasks */}
        <div className="w-full md:w-1/2">
          {/* Add Task Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Task</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
              />
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Current Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Tasks</h2>
            <div>
              {currentTasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  completed={task.completed}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Completed Tasks */}
        <div className="w-full md:w-1/2">
          {/* Completed Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Completed Tasks</h2>
            <div>
              {completedTasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  completed={task.completed}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleClearCompleted}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Clear Completed Tasks
        </button>
        <button
          onClick={handleClearAll}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear All Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskManager;
