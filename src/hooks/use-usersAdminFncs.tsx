import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  collection,
  deleteDoc,
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
      usersList.push({ ...doc.data(), id: doc.id });
    });
    console.log(usersList);
    setUsersArray(usersList);
    setIsLoading(false);
  };

  const addUser = async (formData: any, setUsersArray: any) => {
    setIsLoading(true);
    const { company, email, password } = formData;
    console.log(formData);
    //1. create user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        //2. Create user in Company DB
        const { user } = userCredentials;
        setDoc(doc(db, `companies/${company}/users`, user.uid), {
          ...formData,
        });
        //3. Create user in overall DB (vytáhne se odtud jen company a uid, aby se pak mohla tahat data.)
        setDoc(doc(db, `users`, user.uid), {
          ...formData,
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

  const deleteUser = async (
    company: string,
    userID: any,
    setUsersArray: any
  ) => {
    setIsLoading(true);
    await deleteDoc(doc(db, `companies/${company}/users`, String(userID)));
    setUsersArray((prevArray: any) =>
      prevArray.filter((user: any) => user.id != userID)
    );
    setIsLoading(false);
  };

  return { fetchUsers, addUser, deleteUser, isLoading };
};
