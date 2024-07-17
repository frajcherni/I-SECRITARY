import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import notificationSound from './notifsound.mp3';
import MessageModal from './MessageModal'; // Rename Modal to MessageModal
import RespondModal from './RespondModal';


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const audio = new Audio(notificationSound);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:5000');

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
      setNotification('A new message has been received!');
      audio.play();
      setTimeout(() => {
        setNotification(null);
      }, 10000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleViewDetails = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };
  const handleRespond = () => {
    setIsRespondModalOpen(true);
  };

  const handleCloseRespondModal = () => {
    setIsRespondModalOpen(false);
  };

  const handleSendResponse = async (response) => {
    console.log('Sending response:', response);
    const sendEmail = {
      email: selectedMessage.email,
      username: selectedMessage.username,
      text: `${selectedMessage.message}\n${response}`
    };
  
    try {
      const res = await axios.post("http://localhost:5000/api/sendmail", sendEmail);
      console.log(res.data);
      alert(res.data.message); // Show success or error message
      setResponse("");
      setIsRespondModalOpen(false);
      setSelectedMessage(null);
      const res1 =await axios.patch(`http://localhost:5000/api/messages/${selectedMessage._id}`,{status:"viewed and response"})
      console.log(res1.data);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse("");
      alert('Failed to send email: ' + error.response.data.message);
      handleDeleteMessage(selectedMessage);
       // Show error message
    }
  };
  
  const handleDeleteMessage= (message)=>{
    axios.delete(`http://localhost:5000/api/messages/${selectedMessage._id}`)
    .then(res=>{console.log(res)
    setMessages(messages.filter((message)=>message._id!=selectedMessage._id))
    handleCloseModal()})
    .then(er=>console.log(er))

  }

  return (
    <div className="container mx-auto px-4 py-6">
      {notification && (
        <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
          {notification}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>


            </tr>
          </thead>
          <tbody>
            {messages.map((message, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{message.email}</td>
                <td className="border border-gray-300 px-4 py-2">{message.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(message)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">{message.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={handleCloseModal}
          onDelete={() => handleDeleteMessage(selectedMessage.id)}
          onRespond={handleRespond}
        />
      )}
      {isRespondModalOpen && selectedMessage && (
        <RespondModal
          message={selectedMessage}
          onClose={handleCloseRespondModal}
          onSubmit={handleSendResponse}
          setResponse={setResponse}
          response={response}
        />
      )}
    </div>
  );
};

export default Messages;

