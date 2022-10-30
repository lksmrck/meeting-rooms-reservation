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
  selectedTime: /* ReservationObject[] */ any | null; //array z vybraných časových bloků
  setSelectedTime: Dispatch<SetStateAction<any | null>>;
}

const AppContext = createContext<AppContextInterface | null>(null);

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

  return (
    <AppContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        openModal,
        setOpenModal,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
