import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar, AiFillStar, AiOutlineSend, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FaCommentAlt, FaShare, FaBell, FaUserCircle, FaSmile, FaPaperclip } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';

// Replace with your backend URL
const socket = io('http://localhost:5000');

const departments = [
  { name: "Road Department", icon: "🛣️" },
  { name: "Electricity Department", icon: "⚡" },
  { name: "Water Department", icon: "💧" },
  // Add more departments as needed
];

const initialMessages = [
  {
    id: 1,
    user: "John Doe",
    profileImage: "https://via.placeholder.com/40",
    content: "Any updates about the road maintenance?",
    time: "2 days ago",
    likes: 3,
    comments: [],
    shared: false,
    isImportant: false,
    isPinned: false,
    reactions: {
      thumbsUp: 0,
      heart: 0,
    },
    readBy: ["Alice", "Bob"]
  },
  {
    id: 2,
    user: "Jane Smith",
    profileImage: "https://via.placeholder.com/40",
    content: "Water pipeline repair is scheduled for next week.",
    time: "3 days ago",
    likes: 5,
    comments: [],
    shared: false,
    isImportant: false,
    isPinned: false,
    reactions: {
      thumbsUp: 2,
      heart: 1,
    },
    readBy: ["John", "Alice"]
  },
];

const DiscussionForum = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0].name);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Listen for incoming messages and typing notifications
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', (status) => {
      setIsTyping(status);
    });

    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "Current User",
        profileImage: "https://via.placeholder.com/40",
        content: newMessage,
        time: "Just now",
        likes: 0,
        comments: [],
        shared: false,
        isImportant: false,
        isPinned: false,
        reactions: {
          thumbsUp: 0,
          heart: 0,
        },
        readBy: []
      };

      // Emit the new message to the server
      socket.emit('message', message);
      setNewMessage("");
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', e.target.value.length > 0);
  };

  const handleLike = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    );
    setMessages(updatedMessages);
    setNotifications([...notifications, `You liked a message from ${messages.find(msg => msg.id === id).user}`]);
  };

  const handleComment = (id, comment) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, comments: [...msg.comments, comment] } : msg
    );
    setMessages(updatedMessages);
  };

  const handlePinMessage = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
    );
    setMessages(updatedMessages);
  };

  const handleEditMessage = (id, newContent) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, content: newContent } : msg
    );
    setMessages(updatedMessages);
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    setNotifications([...notifications, `You deleted a message`]);
  };

  const handleReact = (id, type) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, reactions: { ...msg.reactions, [type]: msg.reactions[type] + 1 } } : msg
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-4 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">My Groups</h2>
        <ul className="space-y-3">
          {departments.map((dept, index) => (
            <li
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${selectedDepartment === dept.name ? 'bg-blue-600' : ''}`}
              onClick={() => setSelectedDepartment(dept.name)}
            >
              <span className="mr-2">{dept.icon}</span>
              <span className="font-medium">{dept.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{selectedDepartment} - Discussion Forum</h1>
          <button className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600">
            <FaBell />
          </button>
        </div>

        {/* Typing Indicator */}
        {isTyping && <p className="text-sm text-gray-400 italic">Someone is typing...</p>}

        {/* Message Area */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-4">
            {messages
              .sort((a, b) => (b.isPinned ? 1 : -1)) // Pin important messages at the top
              .map((message, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={message.profileImage} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-blue-500" />
                      <div className="ml-3">
                        <strong className="text-lg">{message.user}</strong>
                        <span className="text-sm text-gray-400 ml-2">{message.time}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handlePinMessage(message.id)} title="Pin/Unpin">
                        {message.isPinned ? <AiFillStar color="gold" /> : <AiOutlineStar />}
                      </button>
                      <button onClick={() => handleEditMessage(message.id, prompt("Edit your message:", message.content))} title="Edit">
                        <AiFillEdit color="gray" />
                      </button>
                      <button onClick={() => handleDeleteMessage(message.id)} title="Delete">
                        <AiFillDelete color="red" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 ml-11 text-gray-300">{message.content}</p>

                  {/* Reaction Buttons */}
                  <div className="flex space-x-4 mt-2 ml-11">
                    <button onClick={() => handleLike(message.id)} className="flex items-center space-x-1 hover:text-red-500">
                      {message.likes ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                      <span>{message.likes}</span>
                    </button>
                    <button onClick={() => handleComment(message.id, 'Great point!')} className="flex items-center space-x-1 hover:text-blue-500">
                      <FaCommentAlt />
                      <span>{message.comments.length}</span>
                    </button>
                    <button onClick={() => handleReact(message.id, 'thumbsUp')} className="flex items-center space-x-1 hover:text-green-500">
                      👍 <span>{message.reactions.thumbsUp}</span>
                    </button>
                    <button onClick={() => handleReact(message.id, 'heart')} className="flex items-center space-x-1 hover:text-pink-500">
                      ❤️ <span>{message.reactions.heart}</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Read by: {message.readBy.join(', ') || 'No one yet'}
                  </p>
                </div>
              ))}
          </div>

          {/* New Message Input */}
          <div className="flex mt-4 items-center">
            <FaPaperclip className="text-gray-500 cursor-pointer hover:text-white mr-2" />
            <input
              type="text"
              className="flex-grow p-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={handleTyping}
            />
            <button className="bg-blue-600 p-2 rounded-r-lg hover:bg-blue-700 transition-colors" onClick={handleSendMessage}>
              <AiOutlineSend />
            </button>
            <FaSmile className="text-gray-500 cursor-pointer hover:text-white ml-2" />
          </div>
        </div>
      </main>

      {/* Notifications */}
      <aside className="w-1/4 bg-gray-800 p-4 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded-lg flex items-center">
              <MdNotificationsActive className="text-blue-400 mr-2" />
              {notification}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default DiscussionForum;
