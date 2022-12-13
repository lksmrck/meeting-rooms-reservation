import { getLocalStorage } from "../utils/getLocalStorage";
import { UserTypeInLS } from "../types/types";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AuthContextInterface {
  user: UserTypeInLS | null;
  setUser: Dispatch<SetStateAction<UserTypeInLS | null>>;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Stored data for user and company
  const [user, setUser] = useState(getLocalStorage("user") || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
