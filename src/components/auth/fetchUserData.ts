import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { User as FirebaseUser } from 'firebase/auth';



export const fetchUserData = async (firebaseUser: FirebaseUser) => {
    const {uid, email} = firebaseUser

let userData = {}
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        
    userData = await {uid, email, company: docSnap.data().company, rights: docSnap.data().rights}
   
    }


    return userData
  };
