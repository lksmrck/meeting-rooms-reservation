import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { roomData } from "../data/data";
import {
  BlocksBreakdown,
  CompanyRoom,
  Meeting,
  RoomData,
  Room,
} from "../types/types";
import { useState, useContext } from "react";
import ReservationContext from "../state/ReservationContext";

export const useRoomsOverviewFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRoomsData } = useContext(ReservationContext);

  const roomsOverviewFetch = async (
    company: string,
    date: string
  ): Promise<void> => {
    setIsLoading(true);

    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/rooms`)
    );

    let todaysMeetings: Meeting[] = [];
    //Helper
    let blocksBreakdown: BlocksBreakdown[] = [];
    let companyRooms: CompanyRoom[] = [];

    querySnapshot.forEach((doc) => {
      companyRooms.push({ id: doc.data().id, name: doc.data().name });

      if (!doc.data().meetings) return;
      //Filtered meetins in picked day
      const filteredMeetings = doc
        .data()
        .meetings.filter((meeting: Meeting) => {
          return meeting.date == date;
        });
      if (!filteredMeetings) return;

      filteredMeetings.forEach((meeting: Meeting) => {
        todaysMeetings.push(meeting);
        meeting.blocks.forEach((block: number) => {
          blocksBreakdown.push({ room: meeting.room, block });
        });
      });
    });

    const updatedRooms: Room[] = companyRooms.map((room: CompanyRoom) => {
      const filteredTodaysMeetings = todaysMeetings.filter(
        (meeting: Meeting) => {
          return meeting.room == room.id;
        }
      );
      //Helper
      const blocks = blocksBreakdown.map((bd: BlocksBreakdown) => {
        if (bd.room == room.id) return bd.block;
      });

      const newDataArray = roomData.map((oneRoom: RoomData) => {
        let meetingBlocks: number[] = [];

        filteredTodaysMeetings.forEach((meeting: Meeting) => {
          if (meeting.blocks.includes(oneRoom.block)) {
            meeting.blocks.forEach((block: number) =>
              meetingBlocks.push(block)
            );
          }
        });
        return {
          ...oneRoom,
          reserved: blocks.includes(oneRoom.block),
          meetingBlocks,
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
    roomsOverviewFetch,
  };
};
