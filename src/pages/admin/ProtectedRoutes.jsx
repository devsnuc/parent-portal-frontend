import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;