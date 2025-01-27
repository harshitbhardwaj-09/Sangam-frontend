import React, { useState } from 'react';
import VideoConference from '../Components/VideoConfrence';

const VideoConferencePage = () => {
  const roomID = new URLSearchParams(window.location.search).get('roomID') || (Math.floor(Math.random() * 10000) + "");

  // State to manage the visibility of the form
  const [isFormVisible, setFormVisible] = useState(false);

  // Function to toggle the form visibility
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className=" bg-[#101114] relative">
      <h1 className="text-3xl font-bold mb-4">Video Conference</h1>
      
      <VideoConference roomID={roomID} />

      {/* Button to open form */}
      <button 
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleFormVisibility}
      >
        Add New Notification
      </button>

      {/* The Form */}
      {isFormVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">New Notification</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Notification Title</label>
                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2" 
                  onClick={toggleFormVisibility}
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default VideoConferencePage;
