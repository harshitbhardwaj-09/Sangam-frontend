import React, { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const AddDepartmentForm = ({ onAddDepartment }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      message.error("Both fields are required!");
      return;
    }

    try {
      setLoading(true);

      // Simulate API request
      await onAddDepartment(formData);

      message.success("Department added successfully!");
      setFormData({ name: "", description: "" }); // Reset form
    } catch (error) {
      message.error(error.message || "Failed to add department.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101114] flex flex-col p-6">
      {/* Search bar at the top right corner */}
      <div className="flex justify-end p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search departments..."
          className="w-80 p-2 border rounded-md"
        />
      </div>

      {/* Main Form Container */}
      <div className="flex justify-center items-center flex-1">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-center text-[#374151]-600 mb-6">
            Add New Department
          </h2>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter department name"
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter department description"
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200"
          >
            {loading ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};
AddDepartmentForm.propTypes = {
  onAddDepartment: PropTypes.func.isRequired,
};

export default AddDepartmentForm;
