import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import Logo from '../assets/website/blacklogo.png'; // Import your logo SVG file

const Home = ({ setcontent }) => {
  const { role } = useAuth(); // Access role using useAuth hook
  const [open, setOpen] = useState(true);

  // Function to check screen width and set initial state for mobile view
  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Adjust this breakpoint as needed for your design
      setOpen(false); // Close sidebar by default on mobile devices
    } else {
      setOpen(true); // Keep sidebar open on larger screens
    }
  };

  // Use useEffect to run checkScreenWidth on initial load and resize
  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  const menus = [
    { name: "Home", link: "/home", icon: MdOutlineDashboard },
    { name: "Historique de service", roles: ['client'], icon: MdOutlineDashboard, content: 5 },
    { name: "Profile", icon: MdOutlineDashboard, content: 2 },
    { name: "Service", roles: ['admin'], icon: MdOutlineDashboard, content: 1 },
    { name: "Demande de service", roles: ['admin'], icon: MdOutlineDashboard, content: 3 },
    { name: "Messages", roles: ['admin'], icon: MdOutlineDashboard, content: 6 },
    // Add more menu items as needed
  ];

  const filteredMenus = menus.filter(menu => !menu.roles || menu.roles.includes(role));

  const handleMenuClick = (content) => {
    setcontent(content);
    // You can optionally add code here to handle other actions after clicking a menu item
  };

  return (
    <div className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between items-center">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <div className="flex items-center ml-4">
            <img src={Logo} alt="Logo" className="h-8 w-auto mb-1" />
          </div>
          <div className="flex flex-col items-center ml-4">
            <div className="text-sm text-gray-400"> {role}</div>
          </div>
          {filteredMenus.map((menu, i) => (
            <Link to={menu.link} key={i}> {/* Wrap the menu item with Link */}
              <div
                onClick={() => handleMenuClick(menu.content)}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold"> 
        {/* Placeholder for content */}
      </div>
    </div>
  );
};

export default Home;
