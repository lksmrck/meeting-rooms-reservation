import { Room } from "../types/types";
import { getLocalStorage } from "../utils/getLocalStorage";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
} from "react";

interface ReservationContextInterface {
  roomsData: Room[];
  setRoomsData: Dispatch<SetStateAction<Room[]>>;
  pickedRoom: Room;
  setPickedRoom: Dispatch<SetStateAction<Room>>;
}

const ReservationContext = createContext({} as ReservationContextInterface);

export const ReservationContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Rooms data
  const [roomsData, setRoomsData] = useState([] as Room[]);

  //Vybraná místnost - komplet data o rezervacích
  const [pickedRoom, setPickedRoom] = useState(
    getLocalStorage("pickedRoom") || ({} as Room)
  );

  useEffect(() => {
    localStorage.setItem("pickedRoom", JSON.stringify(pickedRoom));
  }, [pickedRoom]);

  return (
    <ReservationContext.Provider
      value={{
        roomsData,
        setRoomsData,
        pickedRoom,
        setPickedRoom,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationContext;
