import React, { useState } from 'react';

function ProfileForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log('Form submitted:', { username, email, image });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-9">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 text-center">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center items-center p-4">
        <label htmlFor="image" className="relative cursor-pointer">
          <div className="rounded-full overflow-hidden border-4 border-white w-40 h-40">
            <img
              src={imagePreview || '/defaultprofileimage.jpg'}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
