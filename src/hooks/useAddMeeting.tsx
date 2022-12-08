import { db } from "../config/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import ReservationContext from "../state/ReservationContext";
import { useContext, Dispatch, SetStateAction } from "react";
import { Meeting } from "../types/types";
import { useNavigate } from "react-router-dom";
import AuthContext from "../state/AuthContext";
import AppContext from "../state/AppContext";

export const useAddMeeting = () => {
  /*   const { pickedRoom } = useContext(ReservationContext); */
  const { setIsContextLoading, setError } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const addMeeting = async (
    newMeeting: any,
    pickedRoomId: any,
    navigateURL?: string,
    setFormData?: Dispatch<SetStateAction<{ name: string; type: string }>>
  ) => {
    setIsContextLoading(true);
    const dbRef = doc(
      db,
      `companies/${user.company}/rooms`,
      String(pickedRoomId)
    );

    await updateDoc(dbRef, { meetings: arrayUnion(newMeeting) });
    if (setFormData) setFormData({ name: "", type: "" });
    setIsContextLoading(false);
    navigateURL && navigate(navigateURL);
  };

  return { addMeeting };
};
