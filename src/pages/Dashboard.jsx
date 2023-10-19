import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../components/common/HomeNavbar";
import Navbar from "../components/common/Navbar";
import dashImg from "../assets/images/clock-tower.png";
import routes from "../routes/apiroutes";

const Dashboard = () => {
  const [students, setStudents] = useState({});
  const token = useSelector((state) => state.auth.user?.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If the user is not logged in, redirect them to the login page
      navigate("/");
    } else {
      axios
        .get(routes.students, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [token, navigate]);
  return (
    <div className="h-screen">
      <div className="hidden md:block">
        <DashNavbar />
      </div>
      <div className="block md:hidden">
        <Navbar />
      </div>
      <div className="flex h-screen ">
        <div className="hidden md:block w-[65%] relative">
          <img src={dashImg} className="object-cover w-full h-full" />
          <div className="absolute top-0 bg-gradient-to-tl from-[#005197]/100 via-[#005197]/50 to-[#005197]/10 w-[100%] h-full">
            <div className="flex flex-col justify-center h-full ml-[7%]">
              <div className="outfit-500 text-white text-[52px] mb-6">
                Welcome to
                <div className="text-[#FCEA60] outfit-600">
                  SNUC Parent Portal
                </div>
              </div>
              <div className="text-[30px] outfit-400 text-white w-[50%]">
                Your Gateway to Your Child's Academic Journey!
              </div>
            </div>
          </div>
        </div>
        <h1 className="w-full md:w-[35%] text-[18px] outfit-500 font-medium md:flex-col md:flex md:justify-center  mt-8 md:mt-[8%]">
          <div className="md:hidden mb-12">
            <div className="outfit-500 text-[32px] ml-[5%] mb-6">
              Welcome to
              <div className="text-brandblue outfit-600">
                SNUC Parent Portal
              </div>
            </div>
            <div className="text-[20px] outfit-400  ml-[5%]">
              Your Gateway to Your Child's Academic Journey!
            </div>
          </div>
          <div className="bg-[#F2F3F7] px-5 py-4 w-[90%] md:w-[80%] rounded-[10px] drop-shadow-lg mb-10 mx-auto ">
            <span className="text-[#005197]">Registration Number : </span>
            {students.registration_no}
          </div>
          <div className="bg-[#F2F3F7] px-5 py-4 w-[90%] md:w-[80%] rounded-[10px] drop-shadow-lg mb-10 mx-auto">
            <span className="text-[#005197]">Student Name : </span>
            {students.name}
          </div>
          <div className="bg-[#F2F3F7] px-5 py-4 w-[90%] md:w-[80%] rounded-[10px] drop-shadow-lg mb-10 mx-auto">
            <span className="text-[#005197]">School : </span>
            {students.school}
          </div>
          <div className="bg-[#F2F3F7] px-5 py-4 w-[90%] md:w-[80%] rounded-[10px] drop-shadow-lg mb-10 mx-auto">
            <span className="text-[#005197]">Program : </span>
            {students.program} - {students.section}
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
