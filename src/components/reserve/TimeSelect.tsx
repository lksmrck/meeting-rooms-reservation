import React, { useContext, useEffect, useState } from "react";
import { timeBlocks } from "../../common/dummyData";
import AppContext from "../../state/AppContext";

/* ZDE SLEDOVAT V LOKÁLNÍM STATE MÍSTO CONTEXTU???? - SELECTEDTIME */
const TimeSelect: React.FC = () => {
  const appContext = useContext(AppContext);
  const [reservedBlocks, setReservedBlocks] = useState(0);

  //Počítadlo rezervovaných bloků
  useEffect(() => {
    if (appContext?.selectedTime)
      appContext?.selectedTime.map((data) => {
        if (data.reserved) {
          setReservedBlocks(reservedBlocks + 1);
          console.log(reservedBlocks);
        }
      });
  }, [appContext?.selectedTime]);

  //USEEFFECT při prvním renderu, že se do SELECTEDTIME pošle room objekt, kde budou bloky + RESERVED: TRUE/FALSE

  const onClickHandler = (blockNumber: number): void => {
    //Logika -> Vybírá se právě 1 scházka. Tzn, že lze vybírat jen souvislé časové bloky - nelze vybrat např. blok 7:00-7:30 a k tomu 12:00-12:30
    //Podminky
    //0. Check které bloky už jsou rezervované !
    //1. Pokud je prazdne pole (jeste neni nic vybrano) lze kliknout na cokoliv a vybrat.
    if (appContext?.selectedTime && reservedBlocks == 0) {
      appContext.setSelectedTime([{ block: blockNumber, reserved: true }]);
      console.log(appContext.selectedTime);
    }
    //2. Pokud má pole 1 vybraný blok, tak lze vybrat pouze blok+1 nebo blok-1
    if (appContext?.selectedTime && reservedBlocks == 1) {
      const oldBlock = appContext?.selectedTime[0]; //uloženo číslo bloku 1-24
      //Při opětovném kliknutí odrezervuje.
      if (oldBlock.block == blockNumber && oldBlock.reserved) {
        const newObject = { ...appContext.selectedTime[0], reserved: false };
        appContext.setSelectedTime([newObject]);
      } else if (
        blockNumber == oldBlock.block + 1 ||
        blockNumber == oldBlock.block - 1
      ) {
        appContext.setSelectedTime((prevState) => [
          ...(prevState as any),
          { block: blockNumber, reserved: true },
        ]);
      }
    }
    //3. Pokud má pole více než 1 vybraný blok, tak:
    if (appContext?.selectedTime && appContext?.selectedTime.length > 1) {
      //- Získám nejmenší block ID (ze selected room contextu), a kliknout a vybrat lze pouze n-1 NEBO
      const minBlock = Math.min(
        ...appContext?.selectedTime.map((o) => {
          return o.block;
        })
      );
      //- Získám největší block ID (ze selected room contextu), a kliknout a vybrat lze pouze n+1
      const maxBlock = Math.max(
        ...appContext?.selectedTime.map((o) => {
          return o.block;
        })
      );

      if (blockNumber == minBlock - 1 || blockNumber == maxBlock + 1) {
        appContext.setSelectedTime((prevState) => [
          ...(prevState as any),
          { block: blockNumber, reserved: true },
        ]);
      }
    }

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
      (room) => room.block == roomData.block
    );
    return (
      <div
        key={roomData.block}
        className={`h-10 ${
          roomData.reserved ? "bg-red-600" : "bg-white"
        }  w-20 text-xs border border-green-600`}
        onClick={() => onClickHandler(roomData.block)}
        //Style, protože Tailwind neumožňuje jednoduché dynamické formátování (zde v případě, že se vybere block, tak se změní bgColor)
        style={{ backgroundColor: selectedBlock?.reserved ? "blue" : "white" }}
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
