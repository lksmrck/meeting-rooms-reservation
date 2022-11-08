import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { rooms } from "../common/dummyData";
import { ONEDUMMYROOM } from "../common/dummyData";

const initialRoom = rooms.find((room) => room.id == 1);

/* type ReservationObject = {
  block: number;
  reserved: boolean;
}; */

interface AppContextInterface {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedRoom: any;
  setSelectedRoom: /* Dispatch<SetStateAction<number | null>>; */ any;
  selectedTime: /* ReservationObject[] */ any; //array z vybraných časových bloků
  setSelectedTime: Dispatch<SetStateAction<any | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextInterface);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //1. Handling vybrané místnosti při rezervaci
  const [selectedRoom, setSelectedRoom] =
    useState<any>(initialRoom); /* number | null */
  //2. Handling otevření modal okna s time blocky při rezervaci
  const [openModal, setOpenModal] = useState<boolean>(false);

  //3. Handling výběru časových bloků - čísla bloků 1-24
  const [selectedTime, setSelectedTime] =
    useState</* ReservationObject[] any */ null>(ONEDUMMYROOM as any);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        openModal,
        setOpenModal,
        selectedTime,
        setSelectedTime,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
