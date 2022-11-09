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
  pickedRoom: any;
  setPickedRoom: Dispatch<SetStateAction<any>>;
  pickedDate: string;
  setPickedDate: Dispatch<SetStateAction<string>>;
  pickedBlock: any;
  setPickedBlock: Dispatch<SetStateAction<any>>;
  meetingType: string;
  setMeetingType: Dispatch<SetStateAction<string>>;
}

const ReservationContext = createContext({} as ReservationContextInterface);

export const ReservationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Default
  const [defaultRoomsOverview, setDefaultRoomsOverview] = useState(null);
  //Default data místnosti za 1 den, upraví se potom podle toho co je rezervováno (po fetchi z firebase)
  const [defaultDayData, setDefaultDayData] = useState(null);
  //Home (Calendar)
  const [pickedDate, setPickedDate] = useState<string>("");
  //Overview
  const [pickedBlock, setPickedBlock] = useState({ room: "", block: "" });
  //Vybraná místnost - komplet data o rezervacích
  const [pickedRoom, setPickedRoom] = useState();

  const [meetingType, setMeetingType] = useState("");
  //TEST
  useEffect(() => {
    /*  console.log(pickedDate.toLocaleDateString()); */
    console.log(pickedBlock);
  }, [pickedDate, pickedBlock]);

  return (
    <ReservationContext.Provider
      value={{
        pickedDate,
        setPickedDate,
        pickedBlock,
        setPickedBlock,
        pickedRoom,
        setPickedRoom,
        meetingType,
        setMeetingType,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
export default ReservationContext;
