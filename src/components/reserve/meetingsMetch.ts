import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const meetingsFetch = (company: string, date: string, setState: React.Dispatch<React.SetStateAction<any>>) => {

 const meetingsFetch = async () => {

    const docRef = doc(db, `companies/${company}/rooms`, "1");
    const docSnap = await getDoc(docRef);
    
    let meetings
    if (docSnap.exists()) {
      meetings = docSnap.data().meetings
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

 setState(meetings)
  };
  meetingsFetch();

}