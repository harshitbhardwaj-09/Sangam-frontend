import React, { useState } from "react";
import SeminarImage from '../assets/seminar.jpg';

const Seminar = () => {
  const [seminars, setSeminars] = useState([
    {
      title: "How to use various tools?",
      description: "Learn how to properly use a variety of tools for different purposes.",
      author: "Mr. Brijesh",
      date: "10 November 2024",
    },
    {
      title: "How to check the material in road?",
      description: "Techniques to evaluate the quality of road construction materials.",
      author: "Mr. Aryaman",
      date: "10 November 2024",
    },
    {
      title: "How to do wiring of electricity wiring?",
      description: "A step-by-step guide to safely wire electrical systems.",
      author: "Mr. Harshit",
      date: "10 November 2024",
    },
    {
        title: "How to do wiring of electricity wiring?",
        description: "A step-by-step guide to safely wire electrical systems.",
        author: "Mr. Deepak",
        date: "10 November 2024",
      },
  ]);


  const [newSeminar, setNewSeminar] = useState({
    title: "",
    description: "",
    author: "",
    date: "",
  });


  const [showModal, setShowModal] = useState(false);


  const handleUpload = () => {
    if (newSeminar.title && newSeminar.description && newSeminar.author && newSeminar.date) {
      setSeminars([...seminars, newSeminar]);
      setNewSeminar({ title: "", description: "", author: "", date: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };


  return (
    <div className="bg-gradient-to-b from-[#1A202C] to-[#101114] min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Seminars
        </h1>
        {/* <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-md shadow-lg hover:scale-105 transform transition"
        >
          + Add Seminar
        </button> */}
      </div>


      {/* Seminar List */}
      <div className="grid gap-6 lg:grid-cols-2">
        {seminars.map((seminar, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg flex items-center overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {/* Left: Thumbnail */}
            <img
              src={SeminarImage}
              alt="thumbnail"
              className="w-36 h-36 object-cover rounded-l-lg"
            />
            {/* Right: Seminar Details */}
            <div className="p-5 flex-grow">
              <h2 className="text-2xl font-bold text-white">{seminar.title}</h2>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{seminar.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-gray-400">
                  By <span className="text-blue-400 font-medium">{seminar.author}</span>
                </p>
                <p className="text-sm text-gray-500">📅 {seminar.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-extrabold mb-4 text-center text-gradient">
              Add New Seminar
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Seminar Title</label>
                <input
                  type="text"
                  placeholder="Enter seminar title"
                  className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  value={newSeminar.title}
                  onChange={(e) => setNewSeminar({ ...newSeminar, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  placeholder="Enter seminar description"
                  className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  value={newSeminar.description}
                  onChange={(e) => setNewSeminar({ ...newSeminar, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Author Name</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  value={newSeminar.author}
                  onChange={(e) => setNewSeminar({ ...newSeminar, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Publish Date</label>
                <input
                  type="date"
                  className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  value={newSeminar.date}
                  onChange={(e) => setNewSeminar({ ...newSeminar, date: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-105 transform transition"
                >
                  Add Seminar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Seminar;