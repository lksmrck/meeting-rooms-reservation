import React from "react";
import { Room, RoomData } from "../../types/types";

type RoomsDomProps = {
  roomsData: any;
  clickBlockHandler: (room: number, block: number) => void;
};

const RoomsDom: React.FC<RoomsDomProps> = ({
  roomsData,
  clickBlockHandler,
}) => {
  //Vytvoří DOM pro místnosti uzpůsobený pro Grid
  const roomsDom = roomsData.map((room: Room) => {
    //Pokud je v daném bloku a daném dnu meeting, tak se zde sleduje, jestli už byl na blok vytvořen DOM
    let meetingsHelper: number[] = [];
    let height;

    return (
      <div key={room.id}>
        <div className="text-xs w-20 h-10 flex justify-center items-center border border-stone-700  rounded-md bg-emerald-700 text-white font-bold mb-1 cursor-pointer">
          {room.name}
        </div>
        {room.roomData.map((roomData: RoomData) => {
          const includedInHelper = meetingsHelper.some((blockNo: number) =>
            roomData.meetingBlocks?.includes(blockNo)
          );
          if (includedInHelper) {
            return "";
          }
          if (roomData.reserved && !includedInHelper) {
            height = roomData.meetingBlocks!.length * 2.5;

            //Přičte block do meetingHelper, aby se vědělo, že pro tento meeting byl již DOM vytvořen
            roomData.meetingBlocks?.forEach((block: number) => {
              meetingsHelper.push(block);
            });

            return (
              <div
                key={roomData.block}
                onClick={() => clickBlockHandler(room.id, roomData.block)}
                className={`bg-blue-700 hover:bg-blue-800 rounded-md flex justify-center items-center w-20 text-xs  border border-stone-700 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
                style={{ height: `${height}rem` }}
              >
                Reserved
              </div>
            );
          }
          return (
            <div
              key={roomData.block}
              onClick={() => clickBlockHandler(room.id, roomData.block)}
              className={`h-10 rounded-md bg-white hover:bg-slate-100 flex justify-center items-center w-20 text-xs border border-stone-700 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
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
