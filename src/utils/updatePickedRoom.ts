//Update pickedRoom state po updatování meetingu
export const updatePickedRoom =  (pickedRoom: any, setPickedRoom: any, deletedMeeting:any, newMeeting:any ) => {
    
    const firstIterate = pickedRoom.roomData.map((roomData: any) => {
        if (deletedMeeting.blocks.includes(roomData.block)) {
          return { ...roomData, reserved: false, meetingBlocks: [] };
        }
        return { ...roomData };
      });
      const secondIterate = firstIterate.map((roomData: any) => {
        if (newMeeting.blocks.includes(roomData.block)) {
          return {
            ...roomData,
            reserved: true,
            meetingBlocks: newMeeting.blocks,
          };
        }
        return { ...roomData };
      });
      setPickedRoom((prevData: any) => ({
        ...prevData,
        roomData: secondIterate,
      }));

}