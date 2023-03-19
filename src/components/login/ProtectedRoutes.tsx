import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FC } from "react";

const ProtectedRoutes: FC<{ allowedRights: string[] }> = ({
  allowedRights,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.rights == null)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return allowedRights.find((right: string) => right.includes(user!.rights)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoutes;
