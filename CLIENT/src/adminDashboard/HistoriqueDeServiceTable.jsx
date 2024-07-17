import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook

function CommonDataComponent() {
  const { requestID } = useAuth(); // Get the user ID from the authentication context
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/commondata/get/${requestID}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [requestID]); // Include requestID in the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="">
        <div className="inline-block min-w-min overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-min">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  User name
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Payment
                </th>
           
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Profession
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Service
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.user.username}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.request.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.demande.paymentDetails}</td>
              
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.request.profession}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.request.service}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{data.request.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><button className='text-primary'>Payer</button></td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CommonDataComponent;