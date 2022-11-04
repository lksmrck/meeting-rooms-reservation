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
  pickedBlock: any;
  setPickedBlock: Dispatch<SetStateAction<any>>;
}

const ReservationContext = createContext({} as ReservationContextInterface);

export const ReservationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Default data místnosti za 1 den, upraví se potom podle toho co je rezervováno (po fetchi z firebase)
  const [defaultDayData, setDefaultDayData] = useState();
  //Home (Calendar)
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  //Overview
  const [pickedBlock, setPickedBlock] = useState({ room: "", block: "" });

  //TEST
  useEffect(() => {
    console.log(pickedDate.toLocaleDateString());
    console.log(pickedBlock);
  }, [pickedDate, pickedBlock]);

  return (
    <ReservationContext.Provider
      value={{
        pickedDate,
        setPickedDate,
        pickedBlock,
        setPickedBlock,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationContext;
