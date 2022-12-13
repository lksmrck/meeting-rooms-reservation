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

export const useRoomsAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const roomsFetch = async (
    /* company: string, */ setRoomsArray: Dispatch<
      SetStateAction<CompanyRoom[]>
    >
  ) => {
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

  const addRoom = async (roomsArray: CompanyRoom[], name: string) => {
    setIsLoading(true);
    const id = roomsArray.length + 1;
    /*   const name = "newName"; */
    await setDoc(doc(db, `companies/${user?.company}/rooms`, String(id)), {
      id,
      name,
      meetings: [],
    });
    setIsLoading(false);
  };

  const deleteRoom = async (
    roomID: number,
    setRoomsArray: Dispatch<SetStateAction<CompanyRoom[]>>
  ) => {
    setIsLoading(true);
    await deleteDoc(
      doc(db, `companies/${user?.company}/rooms`, String(roomID))
    );
    setRoomsArray((prevArray: CompanyRoom[]) =>
      prevArray.filter((room: CompanyRoom) => room.id != roomID)
    );
    setIsLoading(false);
  };

  return { roomsFetch, addRoom, deleteRoom, isLoading };
};
