import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface ReservationContextInterface {
  /*   openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedRoom: any;
  setSelectedRoom: /* Dispatch<SetStateAction<number | null>>; */
  pickedDate: Date;
  setPickedDate: Dispatch<SetStateAction<Date>>;
}

const ReservationContext = createContext({} as ReservationContextInterface);

export const ReservationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(pickedDate.toLocaleDateString());
  }, [pickedDate]);

  return (
    <ReservationContext.Provider
      value={{
        pickedDate,
        setPickedDate,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationContext;
