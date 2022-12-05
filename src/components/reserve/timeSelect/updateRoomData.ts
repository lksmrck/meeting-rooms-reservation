import { RoomData } from "../../../types/types";

export const updateRoomData = (pickedRoom: any, blockNumber: number) => {

    const updatedRoomData = pickedRoom.roomData.map((data: RoomData) => {
        if (data.block == blockNumber) {
          return { ...data, selected: !data.selected };
        }
        return data;
      });

      const updatedRoom = { ...pickedRoom, roomData: updatedRoomData };

      return updatedRoom
}