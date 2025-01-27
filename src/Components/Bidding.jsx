import React, { useState } from "react";
import jcb from "../assets/jcb.jpg";
import bulldozer from "../assets/bulldozer.jpg";
import excavators from "../assets/excavators.jpg";

const BiddingPage = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "JCB",
      details:
        "Power: Minimum 74 hp (55 kW) or higher, suitable for heavy-duty operations.\nEngine Type: Fuel-efficient, BS-IV/Stage IV compliant diesel engine.\nDigging Depth: At least 6.5 meters.\nLift Capacity: Minimum 3000 kg.\nAttachments Compatibility: Bucket, breaker, auger, and others.",
      location: "Dasna Road, Ghaziabad, Uttar Pradesh, 201009",
      image: jcb,
      paymentStatus: "Pending",
    },
    {
      id: 2,
      name: "Excavator",
      details:
        "Power: Minimum 100 hp (74 kW) or higher, suitable for heavy-duty operations.\nEngine Type: Fuel-efficient, BS-IV compliant diesel engine.\nDigging Depth: At least 7.0 meters.\nLift Capacity: Minimum 4000 kg.",
      location: "Meerut Road, Ghaziabad, Uttar Pradesh, 201002",
      image: excavators,
      paymentStatus: "Pending",
    },
    {
      id: 3,
      name: "Bulldozer",
      details:
        "Power: Minimum 120 hp, strong torque engine.\nSuitable for heavy earthmoving.\nBlade Width: 3.5 meters or more.\nWeight: 20 tons.",
      location: "Noida Sector 62, Uttar Pradesh",
      image: bulldozer,
      paymentStatus: "Pending",
    },
  ]);

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    details: "",
    location: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewResource({ ...newResource, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleResourceFormSubmit = (e) => {
    e.preventDefault();
    const newId = resources.length + 1;
    setResources([...resources, { id: newId, ...newResource, paymentStatus: "Pending" }]);
    setNewResource({ name: "", details: "", location: "", image: null });
    setShowResourceForm(false);
    alert("New Resource Added!");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setShowFeedbackForm(false);
  };

  const handlePaymentRedirect = (resourceId) => {
    // Simulate redirect and update resource status once payment is complete
    window.location.href = "https://razorpay.me/@pay-man";  // Your Razorpay payment link

    // Update the resource status after payment completion (you'd ideally handle this asynchronously)
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === resourceId ? { ...resource, paymentStatus: "Completed" } : resource
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Bidding System</h1>

      <button
        onClick={() => setShowResourceForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Add New Resource
      </button>

      <button
        onClick={() => setShowFeedbackForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6 ml-4"
      >
        Provide Feedback
      </button>

      {/* Resource Cards */}
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 hover:bg-gray-700 transition-all"
        >
          {/* Resource Image */}
          <img
            src={resource.image}
            alt={resource.name}
            className="w-full md:w-1/4 rounded-lg object-cover"
          />

          {/* Resource Details and Form */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-2">{resource.name}</h2>
            <p className="whitespace-pre-line text-sm mb-3">{resource.details}</p>
            <p className="text-sm mb-4">
              <strong>Location:</strong> {resource.location}
            </p>
            <p className="text-sm mb-4">
              <strong>Status:</strong> {resource.paymentStatus}
            </p>

            {/* Information and Form Fields on the Side */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Min Price</label>
                <input
                  type="number"
                  placeholder="200"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Max Price</label>
                <input
                  type="number"
                  placeholder="300"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Quantity Required</label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Payment Method</label>
                <select className="w-full px-3 py-2 rounded bg-gray-900 text-white">
                  <option value="banking">Banking</option>
                  <option value="cash">Cash</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-sm">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="7017XXXXXX"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
            </div>

            {/* Submit Button to Trigger Payment Link */}
            <button
              onClick={() => handlePaymentRedirect(resource.id)}
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      ))}

      {/* New Resource Form */}
      {showResourceForm && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-bold mb-4">Add New Resource</h2>
            <form onSubmit={handleResourceFormSubmit}>
              <div>
                <label className="block mb-1">Resource Name</label>
                <input
                  type="text"
                  name="name"
                  value={newResource.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1">Details</label>
                <textarea
                  name="details"
                  value={newResource.details}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                  rows="4"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newResource.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1">Resource Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowResourceForm(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div>
                <label className="block mb-1">Your Feedback</label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white"
                  placeholder="Enter your feedback here..."
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingPage;
