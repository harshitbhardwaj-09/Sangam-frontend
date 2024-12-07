// src/pages/VideoConferencePage.jsx
import React from 'react';
import VideoConference from '../Components/VideoConfrence';
const VideoConferencePage = () => {
  const roomID = new URLSearchParams(window.location.search).get('roomID') || (Math.floor(Math.random() * 10000) + "");
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Video Conference</h1>
      <VideoConference roomID={roomID} />
    </div>
  );
};

export default VideoConferencePage;
