import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post('http://localhost:5000/create-payment', {
        amount: amount,
        description: description
      });

      const { payment_url } = response.data;
      console.log('Payment URL:', payment_url);

      if (payment_url) {
        window.location.href = payment_url;
      } else {
        setError('Payment URL is undefined');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      setError('An error occurred while creating the payment.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Amount (TND):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-3">Pay Now</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default PaymentForm;
