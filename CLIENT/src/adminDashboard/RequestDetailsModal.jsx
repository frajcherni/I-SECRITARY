import React from 'react';

function RequestDetailsModal({ request, onClose, onAccept }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
        <div className="px-6 py-4 bg-gray-800 text-white flex items-center justify-between">
          <h2 className="text-xl font-semibold">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-400 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-lg">{request.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Username</p>
              <p className="text-lg">{request.username}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Mobile Number</p>
              <p className="text-lg">{request.mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Postal Address</p>
              <p className="text-lg">{request.postalAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Siren/Siret</p>
              <p className="text-lg">{request.sirenSiret}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Creation Date</p>
              <p className="text-lg">{request.creationDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Profession</p>
              <p className="text-lg">{request.profession}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Service</p>
              <p className="text-lg">{request.service}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg">{request.status}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="ml-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailsModal;
