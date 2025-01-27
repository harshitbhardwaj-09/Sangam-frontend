import React, { useState } from "react";


const Videos = () => {
    const [videos, setVideos] = useState([
        {
          id: 1,
          title: "Road Construction Equipment the Complete Guide and their site use",
          thumbnail: "https://img.youtube.com/vi/1ViTakI1iLA/0.jpg", // Updated thumbnail
          duration: "12:34",
          url: "https://www.youtube.com/watch?v=1ViTakI1iLA",
        },
        {
          id: 2,
          title: "Mountain Road Construction: The Ultimate Guide to Machines and Processes",
          thumbnail: "https://img.youtube.com/vi/D6-gey8ayWg/0.jpg", // Updated thumbnail
          duration: "10:20",
          url: "https://www.youtube.com/watch?v=D6-gey8ayWg",
        },
        {
          id: 3,
          title: "Road construction Process Simplified from Planning, Design to paving",
          thumbnail: "https://img.youtube.com/vi/Wgt_E9SIUb0/0.jpg", // Updated thumbnail
          duration: "15:45",
          url: "https://www.youtube.com/watch?v=Wgt_E9SIUb0",
        },
        {
          id: 4,
          title: "Road Projects: From Start to Finish",
          thumbnail: "https://img.youtube.com/vi/zjEIZDigTBw/0.jpg", // Updated thumbnail
          duration: "8:50",
          url: "https://www.youtube.com/watch?v=zjEIZDigTBw",
        },
        {
          id: 5,
          title: "Complete Guide to Machines and Processes",
          thumbnail: "https://img.youtube.com/vi/GlyCbnAwIno/0.jpg", // Updated thumbnail
          duration: "14:12",
          url: "https://www.youtube.com/watch?v=GlyCbnAwIno",
        },
        {
          id: 6,
          title: "Aggregate Base Course laying on site",
          thumbnail: "https://img.youtube.com/vi/rsjHA_2EDcY/0.jpg", // Updated thumbnail
          duration: "11:30",
          url: "https://www.youtube.com/watch?v=rsjHA_2EDcY",
        },
      ]);
      


  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    thumbnail: "",
    duration: "",
    url: "",
  });


  const handleAddVideo = () => {
    if (newVideo.title && newVideo.thumbnail && newVideo.duration && newVideo.url) {
      setVideos([...videos, { ...newVideo, id: videos.length + 1 }]);
      setNewVideo({ title: "", thumbnail: "", duration: "", url: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };


  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          Training Videos
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 rounded-md text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          + Add Video
        </button>
      </div>


      {/* Video Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-lg">
                {video.duration}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex justify-center items-center transition duration-300">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  Watch Now
                </a>
              </div>
            </div>


            {/* Video Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition">
                {video.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Explore the intricacies of {video.title.toLowerCase()} in this engaging tutorial.
              </p>
            </div>
          </div>
        ))}
      </div>


      {/* Add Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Video</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Video Title</label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Thumbnail URL</label>
                <input
                  type="text"
                  placeholder="Enter thumbnail URL"
                  className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  value={newVideo.thumbnail}
                  onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Duration</label>
                <input
                  type="text"
                  placeholder="Enter duration (e.g., 12:34)"
                  className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Video URL</label>
                <input
                  type="text"
                  placeholder="Enter video URL"
                  className="mt-1 w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  value={newVideo.url}
                  onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Videos;