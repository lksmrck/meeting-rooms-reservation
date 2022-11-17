import React from "react";

type RoomsDomProps = {
  roomsData: any;
  onClickBlockHandler: any;
};

const RoomsDom: React.FC<RoomsDomProps> = ({
  roomsData,
  onClickBlockHandler,
}) => {
  //Vytvoří DOM pro místnosti uzpůsobený pro Grid
  const roomsDom = roomsData.map((room: any) => {
    //Pokud je v daném bloku a daném dnu meeting, tak se zde sleduje, jestli už byl na blok vytvořen DOM
    let meetingsHelper: number[] = [];
    let height;

    return (
      <div key={room.id} className="">
        <h1>{room.name}</h1>
        {room.roomData.map((roomData: any) => {
          const includedInHelper = meetingsHelper.some((blockNo: number) =>
            roomData.meetingBlocks.includes(blockNo)
          );
          if (includedInHelper) {
            return "";
          }
          if (roomData.reserved && !includedInHelper) {
            height = roomData.meetingBlocks.length * 2.5;

            //Přičte block do meetingHelper, aby se vědělo, že pro tento meeting byl již DOM vytvořen
            roomData.meetingBlocks.forEach((block: number) => {
              meetingsHelper.push(block);
            });

            return (
              <div
                key={roomData.block}
                onClick={() => onClickBlockHandler(room.id, roomData.block)}
                className={`  bg-blue-700 rounded-md flex justify-center items-center w-20 text-xs border border-green-600 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
                style={{ height: `${height}rem` }}
              >
                Reserved
              </div>
            );
          }
          return (
            <div
              key={roomData.block}
              onClick={() => onClickBlockHandler(room.id, roomData.block)}
              className={`h-10 rounded-md bg-white flex justify-center items-center w-20 text-xs border border-green-600 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
            >
              Free
            </div>
          );
        })}
      </div>
    );
  });
  return roomsDom;
};

export default RoomsDom;
