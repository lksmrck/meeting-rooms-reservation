import {Dispatch, SetStateAction} from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { roomData } from '../../common/dummyData';
import {BlocksBreakdown, CompanyRoom, Meeting, RoomData, Room} from "../../types/types"

export const roomsMeetingsFetch = (company: string, date: string | null, setRooms: Dispatch<SetStateAction<CompanyRoom[]>>, setRoomsData: Dispatch<SetStateAction<Room[]>>) => {

 const roomsFetch = async () => {

    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/rooms`)
    );
    //Stáhnou se data z Firebase, projedou se meetingy, a pokud jsou nějaké plánované meetingy ve vybraném dnu, tak se uloží do proměnné níže - za všechny místnosti.
    let todaysMeetings: Meeting[] = [];
    //Rozpad bloků + id místnosti
    let blocksBreakdown: BlocksBreakdown[] = [];
    //Rooms dané firmy (id a jméno. Pak posláno do state v mother componentu)
    let companyRooms: CompanyRoom[] = []

   //Vytvořím proměnné s meetingy v daném dnu + jejich breakdown pro lepší pracování s daty.
    querySnapshot.forEach((doc) => {

      companyRooms.push({id: doc.data().id, name: doc.data().name})

      if(!doc.data().meetings) return null
     const filteredMeetings = doc.data().meetings.filter((meeting: Meeting) => {
        return meeting.date == date
      })
      if (filteredMeetings) {filteredMeetings.forEach((meeting: Meeting) => {
        todaysMeetings.push(meeting); 
        meeting.blocks.forEach((block: number) => {
          blocksBreakdown.push(
            {room: meeting.room, block})})})}
    });
    //set state do DailyOverview componentu 
    setRooms(companyRooms)

    //Rezervované bloky -> Najdu v každé room bloky, u kterých bude potřeba upravit property reserved na TRUE.
       const updatedRooms: Room[] = companyRooms.map((room: CompanyRoom) => {
        
        //Vyfiltrované dnešní meetingy podle dané room!
      const filteredTodaysMeetings = todaysMeetings.filter((meeting: Meeting) => {return meeting.room == room.id})

      const blocks = blocksBreakdown.map((bd: BlocksBreakdown) => {
        if (bd.room == room.id) return bd.block;
      });
    
      const newDataArray = roomData.map((oneRoom: RoomData) => {

        let meetingsBlocksArray: number[] = []

        filteredTodaysMeetings.forEach((meeting: Meeting) => {
          if (meeting.blocks.includes(oneRoom.block)) {
            meeting.blocks.forEach((block: number) => meetingsBlocksArray.push(block))
          } 
          

        })
        return {
          ...oneRoom,
          reserved: blocks.includes(oneRoom.block),
          meetingBlocks: meetingsBlocksArray
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