import { db } from "../config/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import ReservationContext from "../state/ReservationContext";
import { useContext, Dispatch, SetStateAction } from "react";
import { Meeting } from "../types/types";
import { useNavigate } from "react-router-dom";

export const useAddMeeting = () => {
  const { pickedRoom } = useContext(ReservationContext);
  const navigate = useNavigate();

  const addMeeting = async (
    newMeeting: any,
    navigateURL: string,
    setFormData?: Dispatch<SetStateAction<{ name: string; type: string }>>,
    update = false
  ) => {
    const dbRef = doc(
      db,
      `companies/secondCompany/rooms`,
      String(pickedRoom.id)
    ); //UPRAVIT DYNAMICKY

    await updateDoc(dbRef, { meetings: arrayUnion(newMeeting) });
    if (setFormData) setFormData({ name: "", type: "" });
    navigate(navigateURL);

    if (update) {
    }
  };

  return { addMeeting };
};
