import { useState, Dispatch, SetStateAction } from "react";
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
import bcrypt from "bcryptjs";
import { UserType } from "../types/types";

export const useUsersAdminFncs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const { user } = useAuth();

  const fetchUsers = async (
    setUsersArray: Dispatch<SetStateAction<UserType[]>>
  ): Promise<void> => {
    setIsLoading(true);
    let usersList: UserType[] = [];

    const querySnapshot = await getDocs(
      collection(db, `companies/${user?.company}/users`)
    );
    querySnapshot.forEach((doc) => {
      usersList.push({ ...doc.data(), id: doc.id } as UserType);
    });

    setUsersArray(usersList);
    setIsLoading(false);
  };

  const addUser = async (
    formData: UserType,
    setUsersArray: Dispatch<SetStateAction<UserType[]>>
  ): Promise<void> => {
    setIsLoading(true);
    const { company, email, password } = formData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    //1. create user in auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
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

        setUsersArray((prevArray: UserType[]) => [...prevArray, formData]);
      })

      .catch((error) => {
        setError({ error: true, message: error.message });
      });

    setIsLoading(false);
  };

  const removeUser = async (
    company: string,
    userID: string,
    setUsersArray: Dispatch<SetStateAction<UserType[]>>
  ): Promise<void> => {
    setIsLoading(true);

    await deleteDoc(doc(db, `companies/${company}/users`, String(userID)))
      .then(() => {
        deleteDoc(doc(db, `users`, String(userID)));
      })
      .catch((error) => {
        setError({
          error: true,
          message: "Something went wrong during downloading meetings.",
        });
      });

    setUsersArray((prevArray: UserType[]) =>
      prevArray.filter((user: UserType) => user.id != userID)
    );
    setIsLoading(false);
  };

  return { fetchUsers, addUser, removeUser, isLoading, error };
};
