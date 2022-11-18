import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

//Detail meetingů v daném vybraném dnu.
export const removeMeeting = (company: string, clickedMeeting: any, room: number) => {

 const updateData = async () => {

    const dbRef = doc(db, `companies/${company}/rooms`, String(room));
    const docSnap = await getDoc(dbRef);
    
    let updatedMeetings: any = []
    if (docSnap.exists()) {
      
     await docSnap.data().meetings.forEach((meeting: any) => {
        if (meeting.id !== clickedMeeting.id ) updatedMeetings.push(meeting)
      })
   
      await updateDoc(dbRef, {
        meetings: updatedMeetings,
      });

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }


  };
  updateData();

}