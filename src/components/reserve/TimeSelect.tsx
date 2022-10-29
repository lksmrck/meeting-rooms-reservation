import React, { useContext, useState } from "react";
import { timeBlocks, rooms } from "../../common/dummyData";
import AppContext from "../../state/AppContext";

const TimeSelect: React.FC = () => {
  const appContext = useContext(AppContext);

  const onClickHandler = (blockNumber: number): void => {
    //Porovnavam roomData.block ID
    //Podminky
    //0. Check které bloky už jsou rezervované !
    //1. Pokud je prazdne pole (jeste neni nic vybrano) lze kliknout na cokoliv a vybrat.
    if (appContext?.selectedTime && appContext?.selectedTime?.length == 0) {
      appContext.setSelectedTime([blockNumber]);
      console.log(appContext.selectedTime);
    }
    //2. Pokud má pole 1 vybraný blok, tak lze vybrat pouze blok+1 nebo blok-1
    if (appContext?.selectedTime && appContext?.selectedTime.length == 1) {
      const oldBlockId = appContext?.selectedTime[0]; //uloženo číslo bloku 1-24
      if (blockNumber == oldBlockId + 1 || blockNumber == oldBlockId - 1) {
        appContext.setSelectedTime((prevState) => [
          ...(prevState as Array<number>),
          blockNumber,
        ]);
        console.log(appContext.selectedTime);
      }
    }
    //3. Pokud má pole více než 1 vybraný blok, tak:
    if (appContext?.selectedTime && appContext?.selectedTime.length > 1) {
      console.log(appContext.selectedTime);
    }
    //- Získám nejmenší block ID (ze selected room contextu), a kliknout a vybrat lze pouze n-1 NEBO
    //- Získám největší block ID (ze selected room contextu), a kliknout a vybrat lze pouze n+1
    //Po kliknutí a splněné IF podmínce se zabarví na zeleno a pošle do selected room contextu
    //+ Při každém kliknu ověřit, jestli už nebylo vybráno. Pokud ano, tak odbarvit a odebrat ze selected room contextu
  };

  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div
        key={block.id}
        className="text-xs w-20 h-10 border border-yellow-700"
      >
        {block.time}
      </div>
    );
  });

  const roomDom = appContext?.selectedRoom.roomData.map((roomData: any) => {
    const selectedBlock = appContext?.selectedTime?.find(
      (block) => block == roomData.block
    );
    return (
      <div
        key={roomData.block}
        className={`h-10 ${
          roomData.reserved ? "bg-red-600" : "bg-white"
        }  w-20 text-xs border border-green-600`}
        onClick={() => onClickHandler(roomData.block)}
        //Style, protože Tailwind neumožňuje jednoduché dynamické formátování (zde v případě, že se vybere block, tak se změní bgColor)
        style={{ backgroundColor: selectedBlock ? "blue" : "white" }}
      >
        {roomData.block}
      </div>
    );
  });

  //Konečný return - 2 sloupce 1. s časovými bloky, 2. vybraná místnost
  return (
    <section className="grid grid-cols-2 w-40">
      <div>{timeBlocksDom}</div>
      <div>{roomDom}</div>
    </section>
  );
};

export default TimeSelect;
