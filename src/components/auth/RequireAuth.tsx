import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth: React.FC<{ allowedRights: string[] }> = ({
  allowedRights,
}) => {
  const { user, userRights } = useAuth();
  const location = useLocation();

  //1. Má user rights na to vidět danou route? -> Zobrazí route
  //2. Je user přihlášený ? -> Zobrazí unauthorized screen
  //3. Zobrazí login page

  return /* user?.rights? */ allowedRights.find((right: any) =>
    right.includes(userRights)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" /* state={{ from: location }} replace */ /> //Při neautorizovaném vstupu přesměruje na /login, a umožní userovi jít back na původní lokaci, které chtěl předtím dosáhnout a po přihlášení přesměruje na tuto url.
  );
};
export default RequireAuth;
