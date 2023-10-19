import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { loginFailure, loginSuccess } from "./features/auth/admin/adminSlice"; // Import the actions
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Grades from "./pages/Grades";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMarks from "./pages/admin/AdminMarks";
import ProtectedRoutes from "./pages/admin/ProtectedRoutes";
import Utilities from "./pages/admin/utilities/Utilities";
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // On app load, check if the admin token exists in local storage and set the state accordingly
    const token = localStorage.getItem("adminToken");
    if (token) {
      // You might want to make an API call here to get admin data using the token and dispatch the appropriate action
      // For simplicity, let's just set the login success state directly for now
      dispatch(loginSuccess({ token }));
    } else {
      dispatch(loginFailure("Login failed."));
    }
  }, [dispatch]);
  return (
    <>
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminside" element={<AdminLogin />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/grades" element={<AdminMarks />} />

        <Route path="/admin/attendance" element={<AdminAttendance />} />

        <Route path="/admin/utilities" element={<Utilities />} />


      </Route>


      <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
