import React from "react";
import { Room, RoomData } from "../../types/types";
import { Button } from "@chakra-ui/react";
import FreeBlock from "../../components/timeBlocks/FreeBlock";
import ReservedBlock from "../../components/timeBlocks/ReservedBlock";

type RoomsDomProps = {
  roomsData: Room[];
  clickBlockHandler: (room: number, block: number) => void;
};

const RoomsDom: React.FC<RoomsDomProps> = ({
  roomsData,
  clickBlockHandler,
}) => {
  //V případě, že název room je dlouhý (delší než 7 znaků), tak se zobrazí prvních 7 znaků a pak 3 tečky.
  const displayedRoomName = (name: string) => {
    if (name.length < 8) return name;
    const shortName = `${name.slice(0, 7)}...`;
    return shortName;
  };
  //Vytvoří DOM pro místnosti uzpůsobený pro Grid
  const roomsDom = roomsData.map((room: Room) => {
    //Pokud je v daném bloku a daném dnu meeting, tak se zde sleduje, jestli už byl na blok vytvořen DOM
    let meetingsHelper: number[] = [];
    let height;

    return (
      <div key={room.id}>
        <div className="text-sm w-20 h-10 flex justify-center items-center border border-stone-700  rounded-md bg-emerald-700 text-white font-bold mb-1 cursor-pointer overflow-auto scrollbar-hide">
          {displayedRoomName(room.name)}
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
              <ReservedBlock
                key={roomData.block}
                height={height}
                onClick={() => clickBlockHandler(room.id, roomData.block)}
              />
            );
          }
          return (
            <FreeBlock
              key={roomData.block}
              onClick={() => clickBlockHandler(room.id, roomData.block)}
            />
          );
        })}
      </div>
    );
  });
  return <>{roomsDom}</>;
};

export default RoomsDom;
