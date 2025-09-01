import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AuthGuard = () => {
  const { user } = useSelector((state) => state.account);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AuthGuard;
