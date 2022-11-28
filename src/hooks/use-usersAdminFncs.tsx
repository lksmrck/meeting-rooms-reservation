import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useUsersAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (company: any, setUsersArray: any) => {
    setIsLoading(true);
    let usersList: any = [];
    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/users`)
    );
    querySnapshot.forEach((doc) => {
      usersList.push({ id: doc.data().id, name: doc.data().name });
    });
    setUsersArray(usersList);
    setIsLoading(false);
  };

  const addUser = async (formData: any, setUsersArray: any) => {
    setIsLoading(true);
    const { name, company, email, password } = formData;

    //1. create user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        //2. Create user in Company DB
        const { user } = userCredentials;
        setDoc(doc(db, `companies/${company}/users`, user.uid), {
          ...formData,
          timeStamp: serverTimestamp(),
        });
        setUsersArray((prevArray: any) => [...prevArray, formData]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    setIsLoading(false);
  };

  const deleteUser = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return { fetchUsers, addUser, deleteUser, isLoading };
};
