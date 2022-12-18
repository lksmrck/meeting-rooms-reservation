import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { User as FirebaseUser } from 'firebase/auth';
import { UserTypeInLS } from "../types/types";

//Funkce na vytáhnutí a úpravu user dat do formátu, se kterým se dále pracuje (využito v Auth componentu)
export const fetchUserData = async (firebaseUser: FirebaseUser) => {
    const {uid, email} = firebaseUser

let userData = {} as UserTypeInLS
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        
    if (!email) return 
    userData = {uid, email, company: docSnap.data().company, rights: docSnap.data().rights}
    }

    return userData
  };
