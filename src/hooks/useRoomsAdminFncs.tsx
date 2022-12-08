import { useState, useContext } from "react";
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

  const roomsFetch = async (/* company: string, */ setRoomsArray: any) => {
    setIsLoading(true);
    let companyRooms: CompanyRoom[] = [];
    const querySnapshot = await getDocs(
      collection(db, `companies/${user.company}/rooms`)
    );
    querySnapshot.forEach((doc) => {
      companyRooms.push({ id: doc.data().id, name: doc.data().name });
    });
    setRoomsArray(companyRooms);
    setIsLoading(false);
  };

  const addRoom = async (
    /* company: string, */
    roomsArray: any,
    /* setRoomsArray: any, */
    name: string
  ) => {
    setIsLoading(true);
    const id = roomsArray.length + 1;
    /*   const name = "newName"; */
    await setDoc(doc(db, `companies/${user.company}/rooms`, String(id)), {
      id,
      name,
      meetings: [],
    });
    /*  setRoomsArray((prevArray: any) => [...prevArray, { id, name }]); */
    setIsLoading(false);
  };

  const deleteRoom = async (
    /* company: string, */
    roomID: any,
    setRoomsArray: any
  ) => {
    setIsLoading(true);
    await deleteDoc(doc(db, `companies/${user.company}/rooms`, String(roomID)));
    setRoomsArray((prevArray: any) =>
      prevArray.filter((room: any) => room.id != roomID)
    );
    setIsLoading(false);
  };

  return { roomsFetch, addRoom, deleteRoom, isLoading };
};
