import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

//Detail meetingů v daném vybraném dnu.
export const meetingsFetch = (company: string, date: string | null, setState: React.Dispatch<React.SetStateAction<any>>, room: number) => {

 const fetchData = async () => {

    const docRef = doc(db, `companies/${company}/rooms`, String(room));
    const docSnap = await getDoc(docRef);
    
    let todaysMeetings: any = []
    if (docSnap.exists()) {
      
     docSnap.data().meetings.forEach((meeting: any) => {
        if (meeting.date == date) todaysMeetings.push(meeting)
      })
   
setState(todaysMeetings)

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

 
  };
  fetchData();

}