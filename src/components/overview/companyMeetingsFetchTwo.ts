import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { roomData } from "../../common/dummyData";

export const companyMeetingsFetchTwo = (company: string) => {

 const roomsFetchDva = async () => {
    console.log("čus");
    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/rooms`)
    );
    //Stáhnou se data z Firebase, projedou se meetingy, a pokud jsou nějaké plánované meetingy ve vybraném dnu, tak se uloží do proměnné níže.
    let todaysMeetings: any = [];
    //Rozpad bloků + id místnosti
    let blocksBreakdown: any = [];

   //Vytvořím proměnné s meetingy v daném dnu + jejich breakdown pro lepší pracování s daty.
    querySnapshot.forEach((doc) => {
      console.log(doc.data().meetings)
    });

    //Rezervované bloky -> Najdu v každé room bloky, u kterých bude potřeba upravit property reserved na TRUE.
 /*    const updatedRooms: any = companyRooms.map((room: any) => {
      const blocks = blocksBreakdown.map((bd: any) => {
        if (bd.room == room.id) return bd.block;
      });

      const newDataArray = roomData.map((oneRoom: any) => {
        return {
          ...oneRoom,
          reserved: blocks.includes(oneRoom.block),
        };
      });
      console.log(newDataArray);
      return {
        ...room,
        roomData: newDataArray,
      };
    });
    setState(updatedRooms); */


  };
  roomsFetchDva();

}