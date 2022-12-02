import React from "react";
import { Room, RoomData } from "../../../types/types";
import { Button } from "@chakra-ui/react";

type OneRoomDomProps = {
  pickedRoom: any; //Room type háže  chybu
  blockClickHandler: any;
};

const OneRoomDom: React.FC<OneRoomDomProps> = ({
  pickedRoom,
  blockClickHandler,
}) => {
  // DOM PRO ROOM - Const ve které je DOM, už roztříděný podle meetingů, kde divy mají alkované rozměry, podle toho, jaké meetingy v daném dnu jsou.
  let meetingsHelper: number[] = [];
  //Const pro sloupec s timeblocky dané místnosti - zobrazení tak, aby meetingy tvořily jeden velký blok a nerezervované bloky byly samostatně.
  const roomDom = pickedRoom.roomData.map((roomData: RoomData) => {
    const selectedBlock = pickedRoom.roomData?.find(
      (room: any) => room.block == roomData.block
    );
    let height;

    //Check zda bloky v meetingBlocks u každého bloku jsou obsaženy v meetingsHelper array.
    const includedInHelper = meetingsHelper.some((no: number) =>
      roomData.meetingBlocks?.includes(no)
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
          className="hover:translate-x-1 w-28 -ml-2 border border-stone-700 shadow-md shadow-slate-600  "
          colorScheme="blue"
          style={{ height: `${height}rem` }}
          onClick={() => blockClickHandler(roomData.block)}
        >
          Reserved
        </Button>
        /*    <div
          key={roomData.block}
          onClick={() => blockClickHandler(roomData.block)}
          className={` bg-blue-700 hover:bg-blue-800 rounded-md flex justify-center items-center w-28 text-xs -ml-2 border border-stone-700 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
          //Inline styling, kvůli problémům s dynamickým stylováním přes tailwind.
          style={{ height: `${height}rem` }}
        >
          Reserved
        </div> */
      );
    }
    return (
      <div>
        <Button
          key={roomData.block}
          size="sm"
          className="hover:scale-105 w-28 -ml-2 border border-stone-700 shadow-md shadow-slate-600 "
          colorScheme={selectedBlock!.selected ? "green" : "gray"}
          style={{ height: `2.5rem` }}
          onClick={() => blockClickHandler(roomData.block)}
        >
          Free
        </Button>
      </div>

      /*  <div
        key={roomData.block}
        onClick={() => blockClickHandler(roomData.block)}
        className={`h-10 rounded-md bg-white  -ml-2 flex justify-center items-center w-28 text-xs border border-stone-700 cursor-pointer hover:scale-105  shadow-lg shadow-slate-600`}
        style={{
          backgroundColor: selectedBlock!.selected ? "green" : "white",
        }}
      >
        Free
      </div> */
    );
  });
  return roomDom;
};

export default OneRoomDom;
