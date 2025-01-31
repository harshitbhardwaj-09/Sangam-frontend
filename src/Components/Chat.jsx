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
  FaFilePdf,
} from 'react-icons/fa';

const socket = io('http://localhost:4000'); // Replace with your server's URL

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
];

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Local chat history

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      if (message.receiver === selectedProfile.name) {
        setChatHistory((prev) => [...prev, message]);
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      if (data.sender === selectedProfile.name) {
        setTyping(data.typing);
      }
    });

    // Cleanup socket listeners when component unmounts or profile changes
    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, [selectedProfile]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        sender: 'You',
        text: message,
        receiver: selectedProfile.name,
      };

      // Emit the message to the server
      socket.emit('chatMessage', newMessage);
      setChatHistory((prev) => [...prev, newMessage]); // Update local chat history
      setMessage('');
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', { sender: 'You', typing: e.target.value.length > 0 });
  };

  return (
    <div className="min-h-screen mt-4 flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-5 border-b border-gray-700 pb-2">Contacts</h2>
        <ul className="space-y-3">
          {profiles.map((profile, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                selectedProfile.name === profile.name
                  ? 'bg-gray-700 shadow-md'
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => {
                setSelectedProfile(profile);
                setChatHistory(profile.chatHistory); // Load the selected profile's chat history
              }}
            >
              <div className="flex items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-gray-400">{profile.status}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col bg-gray-900 shadow-lg">
        {/* Chat Header */}
        <header className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
          <img
            src={selectedProfile.avatar}
            alt={selectedProfile.name}
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold">{selectedProfile.name}</h2>
            <p className="text-sm text-gray-400">{typing ? 'Typing...' : selectedProfile.status}</p>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-900">
          <ul>
            {chatHistory.map((msg, index) => (
              <li
                key={index}
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.sender === 'You'
                    ? 'bg-blue-600 ml-auto text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                <p>{msg.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Message Input */}
        <form
          onSubmit={sendMessage}
          className="flex items-center p-4 bg-gray-800 border-t border-gray-700"
        >
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message"
            className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 rounded-lg ml-3 hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            <FaPaperPlane className="text-white" />
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChatApp;
