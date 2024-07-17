import React, { useState } from 'react';

const RespondModal = ({ message, onClose, onSubmit,response,setResponse }) => {

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(response);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-96 mx-auto rounded-lg shadow-lg p-6">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Respond to Message</h2>
          <p><span className="font-semibold">Email:</span> {message.email}</p>
          <p><span className="font-semibold">Username:</span> {message.username}</p>
          <p><span className="font-semibold">Message:</span> {message.message}</p>
          <textarea
            className="mt-4 w-full p-2 border rounded"
            placeholder="Write your response..."
            value={response}
            onChange={handleResponseChange}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespondModal;
