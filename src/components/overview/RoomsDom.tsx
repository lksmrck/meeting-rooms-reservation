import React from "react";
import { Room, RoomData } from "../../types/types";
import { Button } from "@chakra-ui/react";

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
            return;
          }
          if (roomData.reserved && !includedInHelper) {
            height = roomData.meetingBlocks!.length * 2.5;

            //Přičte block do meetingHelper, aby se vědělo, že pro tento meeting byl již DOM vytvořen
            roomData.meetingBlocks?.forEach((block: number) => {
              meetingsHelper.push(block);
            });

            return (
              <Button
                key={roomData.block}
                size="sm"
                className="hover:translate-x-1 w-20 border border-stone-700 shadow-md shadow-slate-600 "
                colorScheme="telegram"
                style={{ height: `${height}rem` }}
                onClick={() => clickBlockHandler(room.id, roomData.block)}
              >
                Reserved
              </Button>
            );
          }
          return (
            <Button
              key={roomData.block}
              size="sm"
              className="hover:scale-105 w-20 border h-10 border-stone-700 shadow-md shadow-slate-600 "
              colorScheme="gray"
              style={{ height: `2.5rem` }}
              onClick={() => clickBlockHandler(room.id, roomData.block)}
            >
              Free
            </Button>
          );
        })}
      </div>
    );
  });
  return roomsDom;
};

export default RoomsDom;
