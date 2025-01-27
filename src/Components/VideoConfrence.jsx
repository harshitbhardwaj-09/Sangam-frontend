// src/VideoConference.jsx
import React, { useEffect } from 'react';

const VideoConference = ({ roomID }) => {
  useEffect(() => {
    const loadZegoScript = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        const ZegoUIKitPrebuilt = window.ZegoUIKitPrebuilt;
        const appID = 228068426;
        const serverSecret = '3cad7c2ae415bf96c4cadb4c6d5d55a4';
        const userID = Math.floor(Math.random() * 10000) + '';
        const userName = 'userName' + userID;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: document.querySelector("#video-container"),
          sharedLinks: [{
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
          }],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 50,
          layout: "Auto",
          showLayoutButton: true,
        });
      };
    };

    loadZegoScript();
  }, [roomID]);

  return (
    <div id="video-container" style={{ width: '100%', height: '100vh' }}></div>
  );
};

export default VideoConference;
