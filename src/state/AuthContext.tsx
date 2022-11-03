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
  /*   openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedRoom: any;
  setSelectedRoom: /* Dispatch<SetStateAction<number | null>>; */
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
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
