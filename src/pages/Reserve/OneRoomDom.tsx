import { FC } from "react";
import { Room, RoomData } from "../../types/types";
import { Button } from "@chakra-ui/react";

type OneRoomDomProps = {
  pickedRoom: Room;
  blockClickHandler: (blockNumber: number) => void | null;
};

const OneRoomDom: FC<OneRoomDomProps> = ({ pickedRoom, blockClickHandler }) => {
  // DOM PRO ROOM - Const ve které je DOM, už roztříděný podle meetingů, kde divy mají alkované rozměry, podle toho, jaké meetingy v daném dnu jsou.
  let meetingsHelper: number[] = [];
  //Const pro sloupec s timeblocky dané místnosti - zobrazení tak, aby meetingy tvořily jeden velký blok a nerezervované bloky byly samostatně.
  const roomDom = pickedRoom.roomData.map((roomData: RoomData) => {
    const selectedBlock = pickedRoom.roomData?.find(
      (room: RoomData) => room.block === roomData.block
    );
    let height;

    //Check zda bloky v meetingBlocks u každého bloku jsou obsaženy v meetingsHelper array.
    const includedInHelper = meetingsHelper.some((no: number) =>
      roomData.meetingBlocks?.includes(no)
    );

    if (includedInHelper) {
      return null;
    }

    if (roomData.reserved && !includedInHelper) {
      //Vypočítaná výška
      height = roomData.meetingBlocks!.length * 2.5;

      //Přičte block do meetingHelper, aby se vědělo, že pro tento meeting byl již DOM vytvořen
      roomData.meetingBlocks?.forEach((block: number) => {
        meetingsHelper.push(block);
      });

      return (
        <Button
          key={roomData.block}
          size="sm"
          className="hover:translate-x-1 w-28 -ml-2 border border-stone-700 shadow-md shadow-slate-600 "
          colorScheme="telegram"
          style={{ height: `${height}rem` }}
          onClick={() => blockClickHandler(roomData.block)}
        >
          Reserved
        </Button>
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
    );
  });

  return <>{roomDom}</>;
};

export default OneRoomDom;
