import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useAuth from "./useAuth";
import AppContext from "../state/AppContext";
import bcrypt from "bcryptjs";

export const useUsersAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { setError } = useContext(AppContext);

  const fetchUsers = async (setUsersArray: any) => {
    setIsLoading(true);
    let usersList: any = [];
    const querySnapshot = await getDocs(
      collection(db, `companies/${user.company}/users`)
    );
    querySnapshot.forEach((doc) => {
      usersList.push({ ...doc.data(), id: doc.id });
    });

    setUsersArray(usersList);
    setIsLoading(false);
  };

  const addUser = async (formData: any, setUsersArray: any) => {
    setIsLoading(true);
    const { company, email, password } = formData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    //1. create user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        //2. Create user in Company DB
        const { user } = userCredentials;
        setDoc(doc(db, `companies/${company}/users`, user.uid), {
          ...formData,
          password: hashedPassword,
        });
        //3. Create user in overall DB (vytáhne se odtud jen company a uid, aby se pak mohla tahat data.)
        setDoc(doc(db, `users`, user.uid), {
          ...formData,
          password: hashedPassword,
        });

        setUsersArray((prevArray: any) => [...prevArray, formData]);
      })

      .catch((error) => {
        setError({ error: true, message: error.message });
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
        setError({
          error: true,
          message: "Something went wrong during downloading meetings.",
        });
      });

    setUsersArray((prevArray: any) =>
      prevArray.filter((user: any) => user.id != userID)
    );
    setIsLoading(false);
  };

  return { fetchUsers, addUser, removeUser, isLoading };
};
