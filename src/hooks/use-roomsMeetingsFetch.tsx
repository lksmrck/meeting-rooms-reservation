import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { roomData } from "../common/dummyData";
import {
  BlocksBreakdown,
  CompanyRoom,
  Meeting,
  RoomData,
  Room,
} from "../types/types";
import { useState, useContext } from "react";
import ReservationContext from "../state/ReservationContext";

export const useRoomsMeetingsFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRoomsData } = useContext(ReservationContext);

  const roomsFetch = async (company: string, date: string | null) => {
    setIsLoading(true);
    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/rooms`)
    );
    //Stáhnou se data z Firebase, projedou se meetingy, a pokud jsou nějaké plánované meetingy ve vybraném dnu, tak se uloží do proměnné níže - za všechny místnosti.
    let todaysMeetings: Meeting[] = [];
    //Rozpad bloků + id místnosti
    let blocksBreakdown: BlocksBreakdown[] = [];
    //Rooms dané firmy (id a jméno. Pak posláno do state v mother componentu)
    let companyRooms: CompanyRoom[] = [];

    //Vytvořím proměnné s meetingy v daném dnu + jejich breakdown pro lepší pracování s daty.
    querySnapshot.forEach((doc) => {
      companyRooms.push({ id: doc.data().id, name: doc.data().name });

      if (!doc.data().meetings) return null;
      const filteredMeetings = doc
        .data()
        .meetings.filter((meeting: Meeting) => {
          return meeting.date == date;
        });
      if (filteredMeetings) {
        filteredMeetings.forEach((meeting: Meeting) => {
          todaysMeetings.push(meeting);
          meeting.blocks.forEach((block: number) => {
            blocksBreakdown.push({ room: meeting.room, block });
          });
        });
      }
    });
    //set state do DailyOverview componentu

    //Rezervované bloky -> Najdu v každé room bloky, u kterých bude potřeba upravit property reserved na TRUE.
    const updatedRooms: Room[] = companyRooms.map((room: CompanyRoom) => {
      //Vyfiltrované dnešní meetingy podle dané room!
      const filteredTodaysMeetings = todaysMeetings.filter(
        (meeting: Meeting) => {
          return meeting.room == room.id;
        }
      );

      const blocks = blocksBreakdown.map((bd: BlocksBreakdown) => {
        if (bd.room == room.id) return bd.block;
      });

      //Úprava roomData array, které půjde ke každé room (obsahuje blocky, časy, reserved a selected statusy)
      const newDataArray = roomData.map((oneRoom: RoomData) => {
        //Pomocné array
        let meetingsBlocksArray: number[] = [];

        filteredTodaysMeetings.forEach((meeting: Meeting) => {
          if (meeting.blocks.includes(oneRoom.block)) {
            meeting.blocks.forEach((block: number) =>
              meetingsBlocksArray.push(block)
            );
          }
        });
        return {
          ...oneRoom,
          reserved: blocks.includes(oneRoom.block),
          meetingBlocks: meetingsBlocksArray,
        };
      });
      return {
        ...room,
        roomData: newDataArray,
      };
    });
    setRoomsData(updatedRooms);
    setIsLoading(false);
  };

  return {
    isLoading,
    roomsFetch,
  };
};
