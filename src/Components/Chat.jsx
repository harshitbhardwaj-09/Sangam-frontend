import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  FaSearch,
  FaPaperPlane,
  FaSmile,
  FaCog,
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaEdit,
  FaTrashAlt,
  FaStar,
  FaRegStar,
  FaReply,
  FaFilePdf
} from 'react-icons/fa';

const socket = io('http://localhost:4000'); // Replace with your server URL

const profiles = [
  {
    name: 'Aryaman',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    status: 'Online',
    chatHistory: [],
  },
  {
    name: 'Brijesh',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    status: 'Offline',
    chatHistory: [],
  },
  {
    name: 'Vanshika',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    status: 'Online',
    chatHistory: [],
  },
  {
    name: 'Harshit',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    status: 'Busy',
    chatHistory: [],
  }
];

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('Pink Panda'); // Current user
  const [editMode, setEditMode] = useState(null); // To track which message is being edited
  const [starredMessages, setStarredMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // To reply to a message
  const [searchTerm, setSearchTerm] = useState(''); // For searching messages
  const [selectedFile, setSelectedFile] = useState(null); // For media sharing
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]); // Default to first profile
  const [typing, setTyping] = useState(false); // Typing indicator

  useEffect(() => {
    socket.on('message', (message) => {
      setChatHistoryForProfile(message.receiver, message);
    });

    socket.on('typing', (data) => {
      setTyping(data.typing);
    });

    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, []);

  const setChatHistoryForProfile = (profileName, message) => {
    const updatedProfiles = profiles.map((profile) =>
      profile.name === profileName
        ? { ...profile, chatHistory: [...profile.chatHistory, message] }
        : profile
    );
    setSelectedProfile((prevProfile) =>
      prevProfile.name === profileName
        ? { ...prevProfile, chatHistory: [...prevProfile.chatHistory, message] }
        : prevProfile
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    let fileUrl = null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      fileUrl = result.filePath;
    }

    if (message.trim() || fileUrl) {
      const newMessage = {
        sender: user,
        text: message,
        status: 'sent',
        file: fileUrl, // Include file URL if any
        replyTo: replyTo ? selectedProfile.chatHistory[replyTo] : null,
        receiver: selectedProfile.name, // Send message to selected profile
      };

      socket.emit('chatMessage', newMessage);
      setChatHistoryForProfile(user, newMessage);
      setMessage('');
      setSelectedFile(null); // Clear selected file after sending
      setReplyTo(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDeleteMessage = (index) => {
    setChatHistoryForProfile(
      selectedProfile.name,
      selectedProfile.chatHistory.filter((_, i) => i !== index)
    );
  };

  const handleEditMessage = (index) => {
    setEditMode(index);
    setMessage(selectedProfile.chatHistory[index].text);
  };

  const handleStarMessage = (index) => {
    if (starredMessages.includes(index)) {
      setStarredMessages((prev) => prev.filter((i) => i !== index));
    } else {
      setStarredMessages((prev) => [...prev, index]);
    }
  };

  const handleReply = (index) => {
    setReplyTo(index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
    setUser(profile.name);
  };

  const filteredChat = selectedProfile.chatHistory.filter(
    (msg) => msg.text.toLowerCase().includes(searchTerm)
  );

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', { typing: e.target.value.length > 0 });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-5 border-r">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Chats</h2>
          <FaCog className="text-gray-500 cursor-pointer" />
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search"
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        {/* Profiles */}
        <h3 className="text-gray-600 mb-2">Profiles</h3>
        <ul className="space-y-4">
          {profiles.map((profile, index) => (
            <li
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                selectedProfile.name === profile.name
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => handleProfileChange(profile)}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-4">
            <img
              src={selectedProfile.avatar}
              alt={selectedProfile.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{selectedProfile.name}</p>
              <p className="text-sm text-green-500">{selectedProfile.status}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <FaPhone className="text-gray-500 cursor-pointer" />
            <FaVideo className="text-gray-500 cursor-pointer" />
            <FaEllipsisV className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-4">
            {filteredChat.map((msg, index) => (
              <li
                key={index}
                className={`flex ${
                  msg.sender === user ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md max-w-xs ${
                    msg.sender === user
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {msg.replyTo && (
                    <div className="bg-gray-200 p-2 mb-2 rounded-lg text-sm">
                      <p className="font-semibold">{msg.replyTo.sender}</p>
                      <p>{msg.replyTo.text}</p>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  {msg.file && (
                    <>
                      {msg.file.endsWith('.jpg') ||
                      msg.file.endsWith('.jpeg') ||
                      msg.file.endsWith('.png') ? (
                        <img
                          src={msg.file}
                          alt="shared"
                          className="mt-2 max-w-full rounded-lg"
                        />
                      ) : msg.file.endsWith('.mp4') ||
                        msg.file.endsWith('.webm') ||
                        msg.file.endsWith('.ogg') ? (
                        <video
                          src={msg.file}
                          controls
                          className="mt-2 max-w-full rounded-lg"
                        />
                      ) : msg.file.endsWith('.pdf') ? (
                        <div className="mt-2">
                          <a
                            href={msg.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            <FaFilePdf className="inline-block mr-2" />
                            View PDF
                          </a>
                        </div>
                      ) : null}
                    </>
                  )}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <div>
                      <FaReply
                        className="cursor-pointer"
                        onClick={() => handleReply(index)}
                      />
                      {starredMessages.includes(index) ? (
                        <FaStar
                          className="cursor-pointer text-yellow-500"
                          onClick={() => handleStarMessage(index)}
                        />
                      ) : (
                        <FaRegStar
                          className="cursor-pointer"
                          onClick={() => handleStarMessage(index)}
                        />
                      )}
                    </div>
                    <div>
                      <FaEdit
                        className="cursor-pointer"
                        onClick={() => handleEditMessage(index)}
                      />
                      <FaTrashAlt
                        className="cursor-pointer"
                        onClick={() => handleDeleteMessage(index)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {typing && (
            <div className="text-gray-500 italic mt-2">Typing...</div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          {replyTo !== null && (
            <div className="p-2 bg-gray-100 rounded-lg mb-3">
              Replying to: {selectedProfile.chatHistory[replyTo].text}
              <button
                onClick={() => setReplyTo(null)}
                className="text-red-500 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
          <form className="flex space-x-3" onSubmit={sendMessage}>
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Type a message"
              value={message}
              onChange={handleTyping}
            />
            <input type="file" onChange={handleFileChange} />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Starred Messages */}
      <div className="w-1/4 bg-gray-100 p-5 border-l">
        <h2 className="text-2xl font-bold mb-4">Starred Messages</h2>
        <ul className="space-y-4">
          {starredMessages.map((index) => (
            <li key={index} className="p-3 bg-white rounded-lg shadow-md">
              {selectedProfile.chatHistory[index].text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatApp;
