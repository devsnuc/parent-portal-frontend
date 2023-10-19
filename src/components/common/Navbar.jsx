import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo_blue.png";
import userEmoji from "../../assets/images/user-logo.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";

import { Link } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <>
      <nav className="bg-white p-4 sticky  top-0 shadow-md z-[10]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white font-bold text-xl">
              <img className="w-32 ml-2" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 18H20V16H4V18ZM4 13H20V11H4V13ZM4 6H20V4H4V6Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 8H20V6H4V8ZM4 13H20V11H4V13ZM4 18H20V16H4V18Z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className={`hidden md:flex outfit-400 md:items-center`}>
            <Link className="text-black font-medium mx-4" to="/grades">
              Grades
            </Link>
            <Link className="text-black font-medium mx-4" to="/attendance">
              Attendance
            </Link>
            <a className="text-black font-medium mx-4 ml-2" href="https://academicerp.snuchennai.edu.in/#!/login" target="_blank" rel="noopener noreferrer">
              Fee Payment
            </a>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <img src={userEmoji} className="w-8 mr-1" alt="User Emoji" />
                <span className="text-[#005197] font-medium mr-4 my-auto">
                  Welcome, Parent
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-full">
                  <div className="bg-white rounded-md shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-3 text-md text-gray-700 w-full text-left font-medium hover:text-[#005197] hover:bg-gray-100 transition-colors duration-300"
                    >
                      <RiLogoutBoxLine className="inline-block mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden mt-4 border-t border-gray-200 outfit-400`}
        >
          <Link
            className="block py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-[#005197]"
            to="/grades"
          >
            Grades
          </Link>
          <Link
            className="block py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-[#005197]"
            to="/attendance"
          >
            Attendance
          </Link>

          <a
            className="block py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-[#005197]"
            href="https://academicerp.snuchennai.edu.in/#!/login" target="_blank" rel="noopener noreferrer"
          >
            Fee Payment
          </a>
          <button
            onClick={handleLogout}
            className="block py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-[#005197] w-full text-left"
          >
            <RiLogoutBoxLine className="inline-block mr-2" />
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
