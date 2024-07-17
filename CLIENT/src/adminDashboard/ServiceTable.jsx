import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ServiceTable({formatDateProp,services,setServices}) {

  

  return (
    <div>
      <div className="py-2 my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-4">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Services
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
              {services.map((service,idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-left text-gray-900">
                          {service.service}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-left text-gray-900">
                      {service.user && service.user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
                    {formatDateProp(service.createdAt)}
                  </td>
                  <td className="px-6 text-red-500 cursor-pointer  py-4 whitespace-no-wrap border-b text-left border-gray-200">
                    X
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ServiceTable;
