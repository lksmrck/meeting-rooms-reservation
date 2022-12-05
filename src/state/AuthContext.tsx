import { getLocalStorage } from "../utils/getLocalStorage";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AuthContextInterface {
  user: /* FirebaseUser | null; */ any;
  setUser: /* Dispatch<SetStateAction<FirebaseUser | null>>; */ any;
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
