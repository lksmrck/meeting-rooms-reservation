import { db } from "../config/firebase";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { useContext, Dispatch, SetStateAction } from "react";
import { Meeting } from "../types/types";
import { useNavigate } from "react-router-dom";
import AuthContext from "../state/AuthContext";
import AppContext from "../state/AppContext";

export const useAddMeeting = () => {
  const { setIsContextLoading, setError } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const addMeeting = async (
    newMeeting: Meeting,
    pickedRoomId: string,
    navigateURL?: { pathname: string; search: string },
    setFormData?: Dispatch<SetStateAction<{ name: string; type: string }>>
  ): Promise<void> => {
    setIsContextLoading(true);
    const dbRef = doc(
      db,
      `companies/${user!.company}/rooms`,
      String(pickedRoomId)
    );

    try {
      await updateDoc(dbRef, { meetings: arrayUnion(newMeeting) });
      if (setFormData) setFormData({ name: "", type: "" });
      setIsContextLoading(false);
      navigateURL && navigate(navigateURL);
    } catch (error: any) {
      setError({ error: true, message: error?.message });
    }
  };

  return { addMeeting };
};
