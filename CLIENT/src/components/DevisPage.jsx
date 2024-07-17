import React, { useState } from 'react';

const DevisPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="max-w-md mx-auto m-5">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">Demande de devis</h2>
      <form onSubmit={handleSubmit} className="space-y-4 m-6">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          ></textarea>
        </div>
        <button
      type="submit"
      className="bg-primary text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary-dark"
    >
      Soumettre
    </button>
      </form>
    </div>
  );
};

export default DevisPage;
