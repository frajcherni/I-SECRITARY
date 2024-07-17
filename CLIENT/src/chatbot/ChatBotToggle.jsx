import React, { useEffect, useState } from "react";
import ChatBot from "./ChatBot";
import { ChatProvider } from "./ChatContext";
import { useAuth } from "../components/AuthContext";

const ChatBotToggle = () => {
  const { role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setIsOpen(true); // Open chatbot on load
  }, []);
// Conditionally render based on role
if (role === 'admin') {
    return null; // Don't render ChatBotToggle for admins
  }
  return (
    <ChatProvider>
      <div className="fixed bottom-4 right-4 z-50 ">
        {!isOpen ? (
          <button
            onClick={toggleChat}
            className="bg-blue-100 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full flex items-center animate-bounce"
          >
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
           
          </button>
        ) : (
          <div className=" rounded-lg overflow-hidden" >
            <div className="flex flex-col h-screen max-w-sm">
              <div className="flex-grow overflow-y-auto">
                <div className="flex flex-col gap-4 py-4 px-4 h-2/3">
                  <ChatBot closeChat={closeChat}/>
                </div>
              </div>
              <div className="flex justify-center items-center h-16 px-4">
              <button
            onClick={closeChat}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"

         >
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
           
          </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChatProvider>
  );
};

export default ChatBotToggle;
