import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FC } from "react";

const RequireAuth: FC<{ allowedRights: string[] }> = ({ allowedRights }) => {
  const { user } = useAuth();
  const location = useLocation();

  //Pages dostupné po loginu
  //1. Je user přihlášený? Ano - přesměruje na stránku, Ne - přesměruje na login

  //Restricted pages pouze pro admina
  //2. Má user rights na to vidět stránku? Pokud ne, tak:
  //3. Je user přihlášený? Ano - přesměruje na Unauthorized page, Ne - přesměruje na login

  if (user?.rights == null)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return allowedRights.find((right: string) => right.includes(user!.rights)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" /* state={{ from: location }} replace */ /> //Při neautorizovaném vstupu přesměruje na /login, a umožní userovi jít back na původní lokaci, které chtěl předtím dosáhnout a po přihlášení přesměruje na tuto url.
  );
};
export default RequireAuth;
