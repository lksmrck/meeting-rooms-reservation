import { useState, useContext, Dispatch, SetStateAction } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { CompanyRoom } from "../types/types";
import AuthContext from "../state/AuthContext";
import AppContext from "../state/AppContext";

export const useRoomsAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { setError } = useContext(AppContext);

  const roomsFetch = async (
    setRoomsArray: Dispatch<SetStateAction<CompanyRoom[]>>
  ): Promise<void> => {
    setIsLoading(true);
    let companyRooms: CompanyRoom[] = [];
    const querySnapshot = await getDocs(
      collection(db, `companies/${user?.company}/rooms`)
    );
    querySnapshot.forEach((doc) => {
      companyRooms.push({ id: doc.data().id, name: doc.data().name });
    });
    setRoomsArray(companyRooms);
    setIsLoading(false);
  };

  const addRoom = async (
    roomsArray: CompanyRoom[],
    name: string
  ): Promise<void> => {
    setIsLoading(true);
    const id = roomsArray.length + 1;

    try {
      await setDoc(doc(db, `companies/${user?.company}/rooms`, String(id)), {
        id,
        name,
        meetings: [],
      });
    } catch (error: unknown) {
      setError({
        error: true,
        message: "Something went wrong during adding the room.",
      });
    }

    setIsLoading(false);
  };

  const deleteRoom = async (
    roomID: number,
    setRoomsArray: Dispatch<SetStateAction<CompanyRoom[]>>
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteDoc(
        doc(db, `companies/${user?.company}/rooms`, String(roomID))
      );
      setRoomsArray((prevArray: CompanyRoom[]) =>
        prevArray.filter((room: CompanyRoom) => room.id != roomID)
      );
    } catch (error: unknown) {
      setError({
        error: true,
        message: "Something went wrong during deleting the room.",
      });
    }

    setIsLoading(false);
  };

  return { roomsFetch, addRoom, deleteRoom, isLoading };
};
