import Navbar from "./Navbar";
import React from "react";

const AdminDashboard = () => {
  // Admin dashboard content and functionality
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-[#005197] outfit-400 font-medium text-xl">
          Welcome, to Admin Dashboard!
        </h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
