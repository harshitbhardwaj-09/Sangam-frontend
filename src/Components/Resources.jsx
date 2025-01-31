import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00C49F", "#FF8042"]; // Pie chart colors
// const navigate = useNavigate();

const Resources = () => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [resource, setResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [highlightedProjectId, setHighlightedProjectId] = useState("");
  const [newResource, setNewResource] = useState({
    name: "",
    description: "",
    unit: "",
  });
  const [assignResource, setAssignResource] = useState({
    resourceId: "",
    projectId: "",
    quantity: 0,
  });

  // Fetch resources
  const fetchResources = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/getallresources`
      );
      const data = await response.json();
      const mappedResources = data.map((resource) => ({
        id: resource._id,
        name: resource.name,
        description: resource.description,
        unit: resource.unit,
        allocated: resource.assignments[0]?.quantity || 0,
        total: 100,
        assignedTo: resource.assignments[0]?.projectId || null,
      }));
      setResources(mappedResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Create resource
  const createResource = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/resource`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newResource),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setResources([...resources, data]);
        setNewResource({ name: "", description: "", unit: "" });
        setIsCreateModalOpen(false);
        setSuccessMessage("Resource created successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  const handleButtonClick = () => {
    navigate("/reallocate"); // Navigates to the AboutPage
  };

  // Assign resource
  const assignResourceToProject = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/resource/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assignResource),
        }
      );
      if (response.ok) {
        alert("Resource assigned successfully!");
        setAssignResource({ resourceId: "", projectId: "", quantity: 0 });
        setIsAssignModalOpen(false);
        setHighlightedProjectId(assignResource.projectId);
        fetchResources(); // Refresh resources to update assigned data
      }
    } catch (error) {
      console.error("Error assigning resource:", error);
    }
  };
  const fetchResourcesByProjectId = async () => {
    if (!projectId) {
      setError("Please enter a Project ID.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/project/${projectId}/resources`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resources. Please check the Project ID.");
      }
      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchResourceById = async () => {
    if (!resourceId) {
      setError("Please enter a Resource ID.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/resource/${resourceId}`
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch the resource. Please check the ID.");
      }
      const data = await response.json();
      console.log("Fetched resource data:", data);
      setResource(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Modal Close
  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#101114] text-white px-6 py-8">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Resources Management</h1>
        <p className="text-gray-400 mt-2">Manage and assign resources to projects effectively.</p>
      </header>

      {/* Search Bars */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Search by Resource ID"
            className="w-64 p-3 bg-gray-700 text-gray-200 rounded mb-4"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
          />
          <button
            onClick={fetchResourceById}
            className="bg-gray-600 px-6 py-3 rounded-md text-white"
          >
            Search Resource
          </button>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Search by Project ID"
            className="w-64 p-3 bg-gray-700 text-gray-200 rounded mb-4"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <button
            onClick={fetchResourcesByProjectId}
            className="bg-gray-600 px-6 py-3 rounded-md text-white"
          >
            Search Project Resources
          </button>
        </div>
      </div>

      {/* Resource Display */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 text-center">
          <div className="bg-green-600 text-white py-2 px-4 rounded-lg inline-block">
            {successMessage}
          </div>
        </div>
      )}

      {/* Allocate and Request Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 px-6 py-3 rounded-md text-white hover:bg-green-700 transition"
        >
          Create Resource
        </button>
        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="bg-blue-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition"
        >
          Assign Resource
        </button>
        <button
          onClick={handleButtonClick}
          // onClick={Navigate("/reallocate")}
          className="bg-yellow-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition"
        >
          Resource Allocator
        </button>
      </div>

      {/* Allocated Resources Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources
            .filter((resource) => resource.assignedTo !== null) // Filter for allocated resources
            .map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg relative"
              >
                <p><strong>ID:</strong> {resource.id}</p>
                <h2 className="text-xl font-semibold">{resource.name}</h2>
                <p className="text-gray-400 mt-2">{resource.description}</p>
                <p className="text-gray-400 mt-2">Unit: {resource.unit}</p>

                {/* Indicator for Assigned Resource */}
                {resource.assignedTo === highlightedProjectId && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    Assigned to Project {highlightedProjectId}
                  </span>
                )}

                <div className="mt-4">
                  <PieChart width={120} height={120}>
                    <Pie
                      data={[
                        { name: "Allocated", value: resource.allocated },
                        { name: "Remaining", value: resource.total - resource.allocated },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                <div className="absolute bottom-2 right-2 space-x-2">
                  <button className="bg-blue-500 px-4 py-2 rounded text-sm text-white">
                    Edit
                  </button>
                  <button className="bg-red-500 px-4 py-2 rounded text-sm text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Requested Resources Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Requested Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources
            .filter((resource) => resource.assignedTo === null) // Filter for requested resources
            .map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg relative"
              >
                <p><strong>ID:</strong> {resource.id}</p>
                <h2 className="text-xl font-semibold">{resource.name}</h2>
                <p className="text-gray-400 mt-2">{resource.description}</p>
                <p className="text-gray-400 mt-2">Unit: {resource.unit}</p>

                {/* Indicator for Requested Resource */}
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                  Requested
                </span>

                <div className="mt-4">
                  <PieChart width={120} height={120}>
                    <Pie
                      data={[
                        { name: "Requested", value: resource.allocated },
                        { name: "Remaining", value: resource.total - resource.allocated },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                <div className="absolute bottom-2 right-2 space-x-2">
                  {/* <button className="bg-blue-500 px-4 py-2 rounded text-sm text-white">
                Edit
              </button> */}
                  <button className="bg-red-500 px-4 py-2 rounded text-sm text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modals (Create Resource and Assign Resource) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-white mb-4">Create New Resource</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createResource();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              ></textarea>
              <input
                type="text"
                placeholder="Unit"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={newResource.unit}
                onChange={(e) => setNewResource({ ...newResource, unit: e.target.value })}
              />
              <button type="submit" className="w-full bg-green-600 py-2 rounded text-white">
                Create
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-white mb-4">Assign Resource</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                assignResourceToProject();
              }}
            >
              <input
                type="text"
                placeholder="Resource ID"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={assignResource.resourceId}
                onChange={(e) =>
                  setAssignResource({
                    ...assignResource,
                    resourceId: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Project ID"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={assignResource.projectId}
                onChange={(e) =>
                  setAssignResource({
                    ...assignResource,
                    projectId: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-3 bg-gray-700 text-gray-200 rounded mb-4"
                value={assignResource.quantity}
                onChange={(e) =>
                  setAssignResource({
                    ...assignResource,
                    quantity: Number(e.target.value),
                  })
                }
              />
              <button type="submit" className="w-full bg-blue-600 py-2 rounded text-white">
                Assign
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>


  )
}


export default Resources;




