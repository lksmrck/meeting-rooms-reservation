import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { rooms } from "../common/dummyData";

const initialRoom = rooms.find((room) => room.id == 1);

interface AppContextInterface {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //2. Handling otevření modal okna s time blocky při rezervaci
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal,

        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
