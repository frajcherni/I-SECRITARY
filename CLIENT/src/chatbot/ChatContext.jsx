import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  const addMessage = (message, sender) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { message, sender },
    ]);
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
