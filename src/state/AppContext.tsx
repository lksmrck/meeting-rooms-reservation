import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Error } from "../types/types";

interface AppContextInterface {
  isContextLoading: boolean;
  setIsContextLoading: Dispatch<SetStateAction<boolean>>;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
  calendarOpen: boolean;
  setCalendarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Zohlednit toto v custom hooks nebo odebrat upplne!
  const [isContextLoading, setIsContextLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" } as Error);

  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isContextLoading,
        setIsContextLoading,
        error,
        setError,
        calendarOpen,
        setCalendarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
