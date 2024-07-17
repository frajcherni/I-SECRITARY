import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

function ModalServ({ isOpen, onClose, onSubmit , userData }) {
    const modalRef = useRef();
    const [service,setService]=useState("")
    
    if (!isOpen) return null;

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = 
        {service,
            user:userData._id};
        
        console.log(data)


        try {
            const response = await axios.post('http://localhost:5000/api/services/addservices', data);
            onSubmit(response.data);
            console.log(response.data);
            // setProfesions([...professions,{}])
            onClose();
        } catch (error) {
            console.error("There was an error submitting the form:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={handleClickOutside}>
            <div className="bg-white p-6 rounded-lg shadow-lg" ref={modalRef}>
                <h2 className="text-xl font-bold mb-4">New Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
                            Service
                        </label>
                        <input
                            value={service}
                            type="text"
                            id="service"
                            name="service"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            onChange={(e)=>setService(e.target.value)}
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
        </div>
    );
}

export default ModalServ;
