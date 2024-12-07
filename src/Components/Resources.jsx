import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00C49F", "#FF8042"]; // Colors for the Pie chart

const dummyResources = [
  {
    id: 1,
    name: "JCB",
    quantity: 10,
    requester: "Brijesh Gangwar",
    time: "10 days",
    projectName: "Road Project A",
    department: "Road",
    total: 100,
    allocated: 75,
  },
  {
    id: 2,
    name: "Tractor",
    quantity: 8,
    requester: "Brijesh Gangwar",
    time: "12 days",
    projectName: "Road Project B",
    department: "Agriculture",
    total: 100,
    allocated: 50,
  },
];

const Resources = () => {
  const [resources, setResources] = useState(dummyResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    quantity: "",
    time: "",
    requester: "",
    total: 100,
    allocated: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("Requested"); // Tracks the current view

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      newResource.name &&
      newResource.quantity &&
      newResource.time &&
      newResource.requester
    ) {
      setResources([
        ...resources,
        { ...newResource, id: resources.length + 1 },
      ]);
      setNewResource({
        name: "",
        quantity: "",
        time: "",
        requester: "",
        total: 100,
        allocated: 0,
      });
      closeModal();
    }
  };

  // Search filter
  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#101114] text-white min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resource Management</h1>
        <div className="flex gap-4">
          <button
            onClick={openModal}
            className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
          >
            Allocate Resources
          </button>
          <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            Bid Resources
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCurrentView("Requested")}
          className={`px-4 py-2 rounded-md ${
            currentView === "Requested" ? "bg-blue-600" : "bg-gray-600"
          }`}
        >
          Requested Resources
        </button>
        <button
          onClick={() => setCurrentView("Available")}
          className={`px-4 py-2 rounded-md ${
            currentView === "Available" ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          Available Resources
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md bg-[#1c1f25] border border-gray-600 mr-4"
        />
        <select className="p-3 bg-[#1c1f25] rounded-md text-white">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Resource Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Requested / Allocated Resources */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">
            {currentView} Resources
          </h2>
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-[#1c1f25] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{resource.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    currentView === "Requested" ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {currentView}
                </span>
              </div>
              <p>Name: {resource.requester}</p>
              <p>Time: {resource.time}</p>
              <p>Project Name: {resource.projectName}</p>
              <p>Project Department: {resource.department}</p>
            </div>
          ))}
        </div>

        {/* Available Resources */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Resources</h2>
          {filteredResources.map((resource) => {
            const available = resource.total - resource.allocated;
            const data = [
              { name: "Allocated", value: resource.allocated },
              { name: "Available", value: available },
            ];

            return (
              <div
                key={resource.id}
                className="bg-[#1c1f25] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{resource.name}</h3>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-600">
                    Available
                  </span>
                </div>
                <p>Total: {resource.total}</p>
                <p>Allocated: {resource.allocated}</p>
                <p>Available: {available}</p>
                <PieChart width={80} height={80}>
                  <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={35}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Allocating Resources */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1c1f25] p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Allocate Resource</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Resource Name</label>
                <input
                  type="text"
                  value={newResource.name}
                  onChange={(e) =>
                    setNewResource({ ...newResource, name: e.target.value })
                  }
                  className="w-full p-3 rounded-md bg-[#2c3038] border border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quantity</label>
                <input
                  type="number"
                  value={newResource.quantity}
                  onChange={(e) =>
                    setNewResource({ ...newResource, quantity: e.target.value })
                  }
                  className="w-full p-3 rounded-md bg-[#2c3038] border border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Requester</label>
                <input
                  type="text"
                  value={newResource.requester}
                  onChange={(e) =>
                    setNewResource({ ...newResource, requester: e.target.value })
                  }
                  className="w-full p-3 rounded-md bg-[#2c3038] border border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
