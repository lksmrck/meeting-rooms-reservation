import { RoomData } from "../types/types";
import { Room } from "../types/types";

export const updateRoomData = (pickedRoom: Room, blockNumber: number) => {

    const updatedRoomData = pickedRoom.roomData.map((data: RoomData) => {
        if (data.block == blockNumber) {
          return { ...data, selected: !data.selected };
        }
        return data;
      });

      const updatedRoom = { ...pickedRoom, roomData: updatedRoomData };

      return updatedRoom
}