import React from 'react';

const MessageModal = ({ message, onClose, onDelete, onRespond }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-96 mx-auto rounded-lg shadow-lg p-6">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Message Details</h2>
          <p><span className="font-semibold">Email:</span> {message.email}</p>
          <p><span className="font-semibold">Username:</span> {message.username}</p>
          <p><span className="font-semibold">Message:</span> {message.message}</p>
          {/* Add more details as needed */}
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onRespond}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
