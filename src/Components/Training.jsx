import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import seminar from "../assets/seminar.jpg";
import Videos from "../assets/Videos.jpg";
import meeting from "../assets/meeting.jpg";
import news from "../assets/news.jpg";
const TrainingPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [documents, setDocuments] = useState([
    {
      name: "PDF product page presentation",
      uploader: "Dobria Steph",
      task: "Copywriting for all pages",
      date: "Nov 04, 2022",
      fileUrl: "/path/to/sample.pdf", // Replace with actual file path if needed
    },
    {
      name: "Latest menu icons + instances",
      uploader: "Dobria Steph",
      task: "Copywriting for all pages",
      date: "Nov 04, 2022",
      fileUrl: "/path/to/sample2.pdf",
    },
    {
      name: "Terms and Conditions + Privacy Policy",
      uploader: "Julian Bildea",
      task: "Implement online payment",
      date: "Nov 01, 2022",
      fileUrl: "/path/to/sample3.pdf",
    },
  ]);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!pdfFile) return alert("Please select a PDF to upload!");

    const fileUrl = URL.createObjectURL(pdfFile); // Creating a temporary URL for the file
    setDocuments([
      ...documents,
      {
        name: pdfFile.name,
        uploader: "Current User",
        task: "New Task",
        date: new Date().toLocaleDateString(),
        fileUrl, // Assigning the temporary URL for download
      },
    ]);
    setPdfFile(null); // Reset the file input after upload
  };
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleScheduleMeeting = () => {
    navigate("/video-conference"); // Navigate to the VideoConferencing page
  };
  return (
    <div className="min-h-screen bg-[#101114] text-white p-6">
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Seminars",
            image: seminar, // Replace with the correct image source
            description: "Join our exclusive seminars on therapeutic advancements.",
            // duration: "Duration: 60 mins",
            // onClick: () => window.location.href = "/seminars", // Replace with the actual URL
            onClick: () =>navigate("/seminar"), // Replace with the actual URL

          },
          {
            title: "Videos",
            image: Videos, // Replace with the correct image source
            description: "Watch our expert-led video sessions anytime, anywhere.",
            // duration: "Duration: 25 mins",
            onClick: () =>navigate("/videos"), // Replace with the actual URL
          },
          {
            title: "Schedule meeting",
            image: meeting, // Replace with the correct image source
            description: "Set up a meeting with our specialists for personalized advice.",
            duration: "Flexible Timings",
            onClick: handleScheduleMeeting, // Custom function for scheduling meetings
          },
          {
            title: "Latest news",
            image: news, // Replace with the correct image source
            description: "Stay updated with the latest news and trends.",
            duration: "Updated Daily",
            onClick: () =>navigate("/news"), // Replace with the actual URL
          },
        ].map(({ title, image, description, duration, onClick }, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 shadow-md flex flex-col"
          >
            <img src={image} alt={title} className="rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
            <p className="text-gray-500 text-sm mb-2">{duration}</p>
            <button
              onClick={onClick}
              className="bg-blue-600 py-2 px-4 rounded-lg text-sm hover:bg-blue-500"
            >
              {title === "Schedule meeting" ? "Schedule Meeting" : "Learn More"}
            </button>
          </div>
        ))}
      </div>


      {/* Document Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Table Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            Display <span className="font-semibold">5 documents</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Button to trigger the file input */}
            <button
              onClick={() => document.getElementById("file-input").click()}
              className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500"
            >
              Add New Document
            </button>
            <input
              type="file"
              id="file-input"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hidden input, triggered by the button
            />
            <button
              onClick={handleFileUpload}
              className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500"
            >
              Upload PDF
            </button>
            <input
              type="text"
              placeholder="Search documents..."
              className="p-2 rounded-lg bg-gray-700 text-white text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-700 text-gray-400">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Uploaded By</th>
              <th className="py-3 px-4">For Task</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Options</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-700 transition duration-200">
                <td className="py-3 px-4 flex items-center">
                  <span className="mr-2 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full text-xs">
                    PDF
                  </span>
                  <a href={doc.fileUrl} download className="text-blue-400 hover:text-blue-500">
                    {doc.name}
                  </a>
                </td>
                <td className="py-3 px-4">{doc.uploader}</td>
                <td className="py-3 px-4">{doc.task}</td>
                <td className="py-3 px-4">{doc.date}</td>
                <td className="py-3 px-4">
                  <button className="text-gray-400 hover:text-white">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400 text-sm">
            Showing <span className="font-semibold">1 to 5</span> of 43
          </p>
          <div className="flex items-center gap-2">
            <button className="py-1 px-3 rounded-lg bg-gray-700 hover:bg-gray-600">1</button>
            <button className="py-1 px-3 rounded-lg bg-gray-700 hover:bg-gray-600">2</button>
            <button className="py-1 px-3 rounded-lg bg-gray-700 hover:bg-gray-600">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
