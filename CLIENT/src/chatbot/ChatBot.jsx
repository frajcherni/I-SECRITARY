import React, { useState, useEffect, useRef } from "react";
import { useChat } from "./ChatContext";

const ChatBot = ({ closeChat }) => {
  const { chatHistory, addMessage } = useChat();
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    addMessage(message, "user");

    const answer = getAnswer(message.trim().toLowerCase());
    addMessage(answer, "bot");

    setMessage("");
  };

  const getAnswer = (question) => {
    const answers = {
      greeting: "Hello! How can I help you today?",
      pricing: "Our pricing starts at $X per month.",
      support: "Please contact our support team at support@example.com.",
      default: "I'm sorry, I don't have an answer for that. Let me ask the admin for help.",
    };

    return answers[question] || answers.default;
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory.length === 0) {
      addMessage("Hello! How can I help you today?", "bot"); // Send greeting message on load if chatHistory is empty
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex flex-col h-96 w-80 mx-auto bg-white shadow-xl rounded-lg overflow-hidden fixed bottom-20 right-6 transition-all duration-300 border border-gray-200">
      <div className="bg-blue-400 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat Support</h2>
        <button onClick={closeChat} className="text-white focus:outline-none">
          ✖
        </button>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-100">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.sender === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  chat.sender === "bot" ? "bg-gray-300 text-gray-800" : "bg-blue-400 text-white"
                }`}
              >
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center p-4 border-t border-gray-200 bg-gray-100">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
