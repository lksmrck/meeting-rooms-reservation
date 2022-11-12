import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { roomData } from '../../common/dummyData';

export const roomsMeetingsFetch = (company: string, date: string, setRooms: any, setRoomsData: any ) => {

 const roomsFetch = async () => {


    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/rooms`)
    );
    //Stáhnou se data z Firebase, projedou se meetingy, a pokud jsou nějaké plánované meetingy ve vybraném dnu, tak se uloží do proměnné níže.
    let todaysMeetings: any = [];
    //Rozpad bloků + id místnosti
    let blocksBreakdown: any = [];
    //Rooms dané firmy (id a jméno. Pak posláno do state v mother componentu)
    let companyRooms: any =[]

   //Vytvořím proměnné s meetingy v daném dnu + jejich breakdown pro lepší pracování s daty.
    querySnapshot.forEach((doc) => {

      companyRooms.push({id: doc.data().id, name: doc.data().name})

      if(!doc.data().meetings) return null
     const filteredMeetings = doc.data().meetings.filter((meeting: any) => {
        return meeting.date == date
      })
      if (filteredMeetings) {filteredMeetings.forEach((meeting: any) => {
        todaysMeetings.push(meeting); 
        meeting.blocks.forEach((block: any) => {
          blocksBreakdown.push(
            {room: meeting.room, block})})})}
    });
    //set state do DailyOverview componentu 
    setRooms(companyRooms)

    //Rezervované bloky -> Najdu v každé room bloky, u kterých bude potřeba upravit property reserved na TRUE.
       const updatedRooms: any = companyRooms.map((room: any) => {
      const blocks = blocksBreakdown.map((bd: any) => {
        if (bd.room == room.id) return bd.block;
      });

      const newDataArray = roomData.map((oneRoom: any) => {
        return {
          ...oneRoom,
          reserved: blocks.includes(oneRoom.block),
        };
      });
    
      return {
        ...room,
        roomData: newDataArray,
      };
    });
    setRoomsData(updatedRooms);
  };
  roomsFetch();

}