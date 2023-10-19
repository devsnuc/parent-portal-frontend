import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import attendance from "../../assets/images/attendance.png";
import calendar from "../../assets/images/calendar.png";
import logoutIcon from "../../assets/images/logout-icon.png";
import marks from "../../assets/images/marks.png";
import timetable from "../../assets/images/timetable.png";
import { logout, reset } from "../../features/auth/authSlice";
function BottomBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="z-[1] md:hidden block fixed bottom-0 left-0 right-0 bg-[#1D1042]  text-white flex justify-between items-center py-4 px-6">
      <Link to="/marks" className="">
        <img src={marks} alt="Marks" className="w-6 h-6" />
      </Link>
      <Link to="/attendance" className="">
        <img src={attendance} alt="Attendance" className="w-6 h-6" />
      </Link>
      <Link to="/timetable" className="">
        <img src={timetable} alt="Time Table" className="w-6 h-6" />
      </Link>
      <Link to="/calendar" className="">
        <img src={calendar} alt="Calendar" className="w-6 h-6" />
      </Link>
      <div>
        <img
          src={logoutIcon}
          alt="Logout"
          className="w-6 h-6"
          onClick={onLogout}
        />
      </div>
    </nav>
  );
}

export default BottomBar;
