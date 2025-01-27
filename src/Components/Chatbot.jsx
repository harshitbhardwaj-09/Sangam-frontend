import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // State for draggable button position
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // Toggle chatbot popup
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle message sending
  const handleSendClick = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: `ChatGPT Response to: "${input}"`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  // Handle dragging
  const handleDrag = (e) => {
    const newX = position.x + e.movementX;
    const newY = position.y + e.movementY;
    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="relative">
      {/* Draggable Floating Button */}
      <div
        className="fixed"
        style={{ bottom: position.y, right: position.x, cursor: "grab" }}
        onMouseDown={(e) => {
          e.preventDefault();
          document.addEventListener("mousemove", handleDrag);
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleDrag);
          });
        }}
      >
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition"
        >
          💬
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 bg-white w-80 rounded-lg shadow-lg border border-gray-300 transform transition-transform duration-300"
          style={{ transform: isOpen ? "scale(1)" : "scale(0)" }}
        >
          {/* Chat Header */}
          <div className="bg-blue-500 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-400 w-3 h-3 rounded-full"></div>
              <span className="text-lg font-semibold">ChatGPT</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="mr-2">
                    <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-gray-700">
                      🤖
                    </div>
                  </div>
                )}
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } p-3 rounded-lg max-w-xs`}
                >
                  {msg.text}
                  {msg.timestamp && (
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-gray-100 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendClick}
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-lg transition ${
                  input.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;





// import React, { useState } from "react";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "your-openai-api-key", // Replace with your OpenAI API key
// });

// function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi there! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");

//   // State for draggable button position
//   const [position, setPosition] = useState({ x: 20, y: 20 });

//   // Toggle chatbot popup
//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   // Handle message sending
//   const handleSendClick = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input, timestamp: new Date() };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput("");

//     try {
//       // Call the OpenAI API
//       const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [{ role: "user", content: input }],
//       });

//       const botMessage = {
//         sender: "bot",
//         text: completion.choices[0].message.content,
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       const errorMessage = {
//         sender: "bot",
//         text: "Sorry, I couldn't process your request. Please try again later.",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//       console.error("Error calling OpenAI API:", error);
//     }
//   };

//   // Handle dragging
//   const handleDrag = (e) => {
//     const newX = position.x + e.movementX;
//     const newY = position.y + e.movementY;
//     setPosition({ x: newX, y: newY });
//   };

//   return (
//     <div className="relative">
//       {/* Draggable Floating Button */}
//       <div
//         className="fixed"
//         style={{ bottom: position.y, right: position.x, cursor: "grab" }}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           document.addEventListener("mousemove", handleDrag);
//           document.addEventListener("mouseup", () => {
//             document.removeEventListener("mousemove", handleDrag);
//           });
//         }}
//       >
//         <button
//           onClick={toggleChat}
//           className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition"
//         >
//           💬
//         </button>
//       </div>

//       {/* Chat Popup */}
//       {isOpen && (
//         <div
//           className="fixed bottom-20 right-4 bg-white w-80 rounded-lg shadow-lg border border-gray-300 transform transition-transform duration-300"
//           style={{ transform: isOpen ? "scale(1)" : "scale(0)" }}
//         >
//           {/* Chat Header */}
//           <div className="bg-blue-500 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <div className="bg-green-400 w-3 h-3 rounded-full"></div>
//               <span className="text-lg font-semibold">ChatGPT</span>
//             </div>
//             <button
//               onClick={toggleChat}
//               className="text-white hover:text-gray-200 text-lg font-bold"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Chat Body */}
//           <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col space-y-2">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.sender === "bot" && (
//                   <div className="mr-2">
//                     <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-gray-700">
//                       🤖
//                     </div>
//                   </div>
//                 )}
//                 <div
//                   className={`${
//                     msg.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-800"
//                   } p-3 rounded-lg max-w-xs`}
//                 >
//                   {msg.text}
//                   {msg.timestamp && (
//                     <div className="text-xs text-gray-500 mt-1">
//                       {msg.timestamp.toLocaleTimeString()}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Chat Input */}
//           <div className="p-4 bg-gray-100 border-t">
//             <div className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={handleInputChange}
//                 placeholder="Ask me anything..."
//                 className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendClick}
//                 disabled={!input.trim()}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   input.trim()
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbot;
