import { useState } from "react";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
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
import useAuth from "./useAuth";

export const useUsersAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const fetchUsers = async (setUsersArray: any) => {
    setIsLoading(true);
    let usersList: any = [];
    const querySnapshot = await getDocs(
      collection(db, `companies/${user.company}/users`)
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

  const removeUser = async (
    company: string,
    userID: any,
    setUsersArray: any
  ) => {
    setIsLoading(true);
    /*     const user = auth.currentUser; */

    await deleteDoc(doc(db, `companies/${company}/users`, String(userID)))
      /* .then(() => {
        deleteUser()
      }) */
      .catch((error: any) => {
        console.log(error);
      });

    setUsersArray((prevArray: any) =>
      prevArray.filter((user: any) => user.id != userID)
    );
    setIsLoading(false);
  };

  return { fetchUsers, addUser, removeUser, isLoading };
};
