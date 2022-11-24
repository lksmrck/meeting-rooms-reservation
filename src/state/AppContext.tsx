import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Error } from "../types/types";

interface AppContextInterface {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: Error;
  setError: Dispatch<SetStateAction<Error>>;
  isGuestModalOpen: boolean;
  setIsGuestModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //State na otevření modalu s vyplněním guestů - jednodušší distribuce do komponentů
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" } as Error);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        isGuestModalOpen,
        setIsGuestModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
