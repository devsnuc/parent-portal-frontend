import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import attendance from "../../assets/images/attendance.png";
import marks from "../../assets/images/marks.png";
import timetable from "../../assets/images/timetable.png";
import logoutIcon from "../../assets/images/logout-icon.png";
import calendar from "../../assets/images/calendar.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import logo from "../../assets/images/logo.png";
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      className={`relative bg-[#1D1042]  md:block hidden
     text-white w-48 h-screen`}
    >
      <img src={logo} className="w-32 mx-auto mt-8" />

      <ul className="flex mt-16 flex-col items-start py-2 space-y-2">
        <li className="px-6 py-3 mr-16">
          <Link
            to="/marks"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <img src={marks} alt="Marks" className="w-6 h-6" />
            <span>Marks</span>
          </Link>
        </li>
        <li className="px-6 py-3">
          <Link
            to="/attendance"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <img src={attendance} alt="Attendance" className="w-6 h-6" />

            <span>Attendance</span>
          </Link>
        </li>
        <li className="px-6 py-3">
          <Link
            to="/timetable"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <img src={timetable} alt="TimeTable" className="w-6 h-6" />

            <span>Time Table</span>
          </Link>
        </li>
        <li className="px-6 py-3">
          <Link
            to="/calendar"
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <img src={calendar} alt="Calendar" className="w-6 h-6" />

            <span>Calendar</span>
          </Link>
        </li>
      </ul>
      <div className="px-6 py-3 absolute inset-x-0 bottom-5">
        <div className=" flex items-center space-x-2 text-gray-300 hover:text-white hover:cursor-pointer">
          <img
            src={logoutIcon}
            alt="Logout"
            className="w-6 h-6"
            onClick={onLogout}
          />

          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
