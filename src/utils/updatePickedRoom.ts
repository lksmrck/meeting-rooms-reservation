import {Dispatch, SetStateAction} from "react"
import { Room, Meeting, RoomData } from "../types/types";

//Update pickedRoom state po updatování meetingu
export const updatePickedRoom =  (pickedRoom: Room, setPickedRoom: Dispatch<SetStateAction<Room>>, deletedMeeting:Meeting, newMeeting:Meeting ) => {
    
    const firstIterate = pickedRoom.roomData.map((roomData: RoomData) => {
        if (deletedMeeting.blocks.includes(roomData.block)) {
          return { ...roomData, reserved: false, meetingBlocks: [] };
        }
        return { ...roomData };
      });
      const secondIterate = firstIterate.map((roomData: RoomData) => {
        if (newMeeting.blocks.includes(roomData.block)) {
          return {
            ...roomData,
            reserved: true,
            meetingBlocks: newMeeting.blocks,
          };
        }
        return { ...roomData };
      });
      setPickedRoom((prevData: Room) => ({
        ...prevData,
        roomData: secondIterate,
      }));

}