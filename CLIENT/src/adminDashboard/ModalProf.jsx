import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react'

function ModalProf({ isOpen, onClose, onSubmit,userData,professions, setProfesions}) {
    const modalRef = useRef();
    const [profession,setProfession]=useState("")
  

  if (!isOpen) return null;

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = 
    {profession,
        user:userData._id,
        username:userData.username,
      createdAT:new Date()};
    
    console.log(data)

    try {
        const response = await axios.post('http://localhost:5000/api/professions', data);
        onSubmit(response.data);
        const date=new Date()
        console.log(response.data);
        setProfesions([...professions,{profession,
          user:{_id:userData._id,
          username:userData.username},
        createdAT:date.toISOString()}])
        console.log(date.toISOString())
        console.log(professions)

        onClose();
    } catch (error) {
        console.error("There was an error submitting the form:", error);
    }
};
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={handleClickOutside}>
        <div className="bg-white p-6 rounded-lg shadow-lg" ref={modalRef}>
          <h2 className="text-xl font-bold mb-4">New Proffesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Proffesion
              </label>
              <input
                value={profession}
                type="text"
                id="Proffesion"
                name="profession"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                onChange={(e)=>setProfession(e.target.value)}

              />
            </div>
           
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>)};

export default ModalProf