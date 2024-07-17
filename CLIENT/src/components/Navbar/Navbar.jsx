import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "../../assets/website/f.png";
import DarkMode from "./DarkMode";
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useAuth } from "../AuthContext"; // Import useAuth
import { HiOutlineViewGrid } from 'react-icons/hi';

export const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#about",
  },
  {
    id: 2,
    name: "Services",
    link: "/#services",
  },
  {
    id: 3,
    name: "A propos",
    link: "",
  },
  {
    id: 4,
    name: "Demande de devis",
    link: "/devis",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // Get token and logout function from context

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="relative z-10 w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-3 md:py-2">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="" className="w-36" />
         
          </Link>
          {/* Desktop view Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {MenuLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4 ">
                  <Link
                    to={link}
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              {token ? (
                <>
                  <button className="primary-btn" onClick={handleLogoutClick}>Logout</button>
                  {/* Icon instead of Dashboard button */}
                  <Link to="/Dashboard" className="flex items-center gap-2">
                    <HiOutlineViewGrid className="text-xl" />
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="primary-btn">Login</Link>
                </>
              )}
              <DarkMode />
            </ul>
          </nav>
          {/* Mobile view Drawer */}
          <div className="flex items-center gap-4 md:hidden">
            <DarkMode />
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
);
};

export default Navbar;
