import React, { useState } from 'react'
import RequstsTable from './RequstsTable'
import StatsCardServ from './StatsCardServ';
import SpecialitiesTable from './SpecialitiesTable';
import ServiceTable from './ServiceTable';

function Requests() {
  const [tableRequests,setTableRequests]=useState(1)
    const handleStatsCardClick = (value) => {
      setTableRequests(value);
    };
    const [isModalServOpen, setIsModalServOpen] = useState(false);
  
    const handleOpenServModal = () => {
      setIsModalServOpen(true);
      console.log("modal serv open");
    };
  
    const handleCloseServModal = () => {
      setIsModalServOpen(false);
    };
    const [isModalProfOpen, setIsModalProfOpen] = useState(false);
  
    const handleOpenProfModal = () => {
      setIsModalProfOpen(true);
      console.log("modal Prof open");
    };
  
    const handleCloseProfModal = () => {
      setIsModalProfOpen(false);
    };
    const handleSubmit = (data) => {
      console.log('Form Data:', data);
    };
    return (
      <div>
      <div className=" sticky top-7 z-20 mb-12 grid gap-y-10 gap-x-10 md:grid-cols-2 xl:grid-cols-3 mt-5 ">
        <div > <StatsCardServ  
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-6 h-6 text-white "
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            ></path>
            <path
              d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"
            ></path>
          </svg>
        }
        bgColor="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40"
        title="Specialities"
        amount="10"
        percentage="Add Proffesion"
        percentageColor="text-green-500"
        onClick={() => handleStatsCardClick(1)}
        isActive={tableRequests === 1}
        handleOpenModal={handleOpenProfModal}
        
  
      /></div>
      <div><StatsCardServ
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-6 h-6 text-white"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            ></path>
            <path
              d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"
            ></path>
          </svg>
        }
        bgColor="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40"
        title="Services"
        amount="20"
        percentage="Add service"
        percentageColor="text-green-500"
        onClick={() => handleStatsCardClick(2)}
        isActive={tableRequests === 2}
        handleOpenModal={handleOpenServModal}
  
      /></div>
        
        <div><StatsCardServ
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-6 h-6 text-white"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            ></path>
            <path
              d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"
            ></path>
          </svg>
        }
        bgColor="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40"
        title="Services"
        amount="20"
        percentage="Add service"
        percentageColor="text-green-500"
        onClick={() => handleStatsCardClick(3)}
        isActive={tableRequests === 3}
        handleOpenModal={handleOpenServModal}
  
      /></div>
        
      </div>
      <div className='flex justify-center items-center'>
      {tableRequests === 1 && <div className='flex justify-center items-center h-full'> <RequstsTable/></div>}
      {tableRequests === 2 && <div className='flex justify-center items-center h-full'><ServiceTable/></div>}
  
  </div>
       
      
      </div>
  )
}

export default Requests