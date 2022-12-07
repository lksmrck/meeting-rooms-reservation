import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Error } from "../types/types";

interface AppContextInterface {
  isContextLoading: boolean;
  setIsContextLoading: Dispatch<SetStateAction<boolean>>;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isContextLoading, setIsContextLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" } as Error);

  return (
    <AppContext.Provider
      value={{
        isContextLoading,
        setIsContextLoading,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
