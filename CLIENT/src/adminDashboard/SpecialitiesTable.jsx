import axios from 'axios';
import React, { useEffect, useState } from 'react'

function SpecialitiesTable({formatDateProp,professions, setProfesions}) {
  useEffect(() => {
    // Replace the URL with your actual API endpoint
    axios.get('http://localhost:5000/api/professions')
      .then(response => {
        setProfesions(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  return (
    <div className=''>
        <div className="py-2 my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-4">
    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Specialities
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Created By
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Created At 
            </th>
            
            
            
          </tr>
        </thead>

        <tbody className="bg-white">
          {professions.map((profession,idx)=>
          <tr key={idx}>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-left text-gray-900">
                  
                  {profession.profession}
                </div>
               
              </div>
            </div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div className="text-sm leading-5 text-left text-gray-900">
            {profession.user.username}
            </div>
            
          </td>

          <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
          {formatDateProp(profession.createdAt)}
          </td>

          
         

         
        </tr>)}
          {/* Replace with your actual data and loop through it */}
         
     
         
          {/* Repeat the above structure for each row of data */}
        </tbody>
      </table>
    </div>
  </div></div>
  )
}

export default SpecialitiesTable