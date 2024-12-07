import React, { useState } from "react";
import { FaFilePdf, FaFileAlt, FaFileImage, FaCloudUploadAlt } from "react-icons/fa";

const TrainingPage = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Function to add a new document
  const addNewDocument = (newDoc) => {
    setDocuments([...documents, newDoc]);
    setShowUploadModal(false);
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      (filterTag === "All" || doc.tags.includes(filterTag)) &&
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div className={`${darkMode ? "bg-[#101114] text-white" : "bg-white text-gray-900"} min-h-screen p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Training Page</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Document Management Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white rounded-lg p-2"
            />
            <select
              className="bg-gray-700 text-white rounded-lg p-2"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option>All</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Policy</option>
            </select>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => setShowUploadModal(true)}
          >
            <FaCloudUploadAlt /> <span>Add Document</span>
          </button>
        </div>

        {/* Document List */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Document</th>
              <th className="py-2 px-4">Uploaded by</th>
              <th className="py-2 px-4">For task</th>
              <th className="py-2 px-4">Tags</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr
                key={index}
                className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}
              >
                <td className="py-2 px-4 flex items-center space-x-2">
                  <span>
                    {doc.type === "PDF" && <FaFilePdf className="text-red-500" />}
                    {doc.type === "DOC" && <FaFileAlt className="text-blue-500" />}
                    {doc.type === "AI" && <FaFileImage className="text-green-500" />}
                  </span>
                  <a
                    href={doc.url}
                    download={doc.name}
                    className="hover:underline text-blue-400"
                  >
                    {doc.name}
                  </a>
                </td>
                <td className="py-2 px-4">{doc.uploader}</td>
                <td className="py-2 px-4">{doc.task}</td>
                <td className="py-2 px-4">{doc.tags.join(", ")}</td>
                <td className="py-2 px-4">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Upload New Document</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const file = e.target.file.files[0];
                const fileUrl = URL.createObjectURL(file); // Generate a temporary URL for downloading
                const newDoc = {
                  name: e.target.name.value,
                  size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
                  uploader: "Admin",
                  task: e.target.task.value,
                  date: new Date().toLocaleDateString(),
                  type: file.name.split(".").pop().toUpperCase(),
                  tags: e.target.tags.value.split(","),
                  url: fileUrl, // Store the generated URL
                };
                addNewDocument(newDoc);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Document Name"
                className="bg-gray-700 text-white rounded-lg p-2 w-full mb-4"
                required
              />
              <input
                type="file"
                name="file"
                className="bg-gray-700 text-white rounded-lg p-2 w-full mb-4"
                required
              />
              <input
                type="text"
                name="task"
                placeholder="Task Description"
                className="bg-gray-700 text-white rounded-lg p-2 w-full mb-4"
                required
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                className="bg-gray-700 text-white rounded-lg p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
