import React, { useContext, useEffect, useState } from "react";
import { timeBlocks } from "../../common/dummyData";
import AppContext from "../../state/AppContext";
import ReservationContext from "../../state/ReservationContext";

/* ZDE SLEDOVAT V LOKÁLNÍM STATE MÍSTO CONTEXTU???? - SELECTEDTIME */
const TimeSelect: React.FC = () => {
  const appContext = useContext(AppContext);
  const reservationContext = useContext(ReservationContext);

  const [reservedBlocks, setReservedBlocks] = useState(0);

  //Počítadlo vybraných bloků k rezervaci - s každým vybraným blokem přičte 1 do local state,
  useEffect(() => {}, []);

  useEffect(() => {
    setReservedBlocks(0);
    appContext?.selectedTime.map((data: any) => {
      if (data.reserved) {
        setReservedBlocks(reservedBlocks + 1);
      }
    });
  }, [appContext?.selectedTime]);

  const onClickHandler = (blockNumber: number): void => {
    //Logika -> Vybírá se právě 1 schůzka. Tzn, že lze vybírat jen souvislé časové bloky - nelze vybrat např. blok 7:00-7:30 a k tomu 12:00-12:30,
    //ale lze vybrat postupně všechny bloky od 7:00 až do 12:30.
    //Podminky
    //1. Pokud ještě není vybrán žádný blok, lze kliknout na kterýkoliv a vybrat.
    if (appContext?.selectedTime && reservedBlocks == 0) {
      const newReservationArray = appContext.selectedTime.map((data: any) => {
        if (data.block == blockNumber) {
          return { ...data, reserved: !data.reserved };
        }
        return data;
      });

      appContext.setSelectedTime(newReservationArray);
    }
    //2. Pokud je právě 1 vybraný blok, tak lze vybrat pouze blok+1 nebo blok-1 nebo odvybrat vybraný blok
    if (appContext?.selectedTime && reservedBlocks == 1) {
      const reservedBlock = appContext?.selectedTime.filter((obj: any) => {
        return obj.reserved;
      }); //uložen rezervovaný object

      if (
        blockNumber == reservedBlock[0].block ||
        blockNumber == reservedBlock[0].block + 1 ||
        blockNumber == reservedBlock[0].block - 1
      ) {
        const newReservationArray = appContext.selectedTime.map((data: any) => {
          if (data.block == blockNumber) {
            return { ...data, reserved: !data.reserved };
          }
          return data;
        });

        appContext.setSelectedTime(newReservationArray);
      }
    }
    //3. Pokud je více než 1 vybraný blok, tak:
    if (appContext?.selectedTime && reservedBlocks > 1) {
      //Vyfiltorvání bloků, u kterých je reserved = true
      const reservedBlocks = appContext?.selectedTime.filter((obj: any) => {
        return obj.reserved;
      });
      // 3.1 Získám nejmenší block ID (n) (pak půjde kliknout pouze n-1 (přidat) nebo n (odebrat))
      const minBlock = Math.min(
        ...reservedBlocks.map((obj: any) => {
          return obj.block;
        })
      );
      // 3.2. Získám největší block ID (n) (pak půjde kliknout pouze n+1 (přidat) nebo n (odebrat))
      const maxBlock = Math.max(
        ...reservedBlocks.map((obj: any) => {
          return obj.block;
        })
      );

      if (
        blockNumber == minBlock - 1 ||
        blockNumber == maxBlock + 1 ||
        blockNumber == minBlock ||
        blockNumber == maxBlock
      ) {
        const newReservationArray = appContext.selectedTime.map((data: any) => {
          if (data.block == blockNumber) {
            return { ...data, reserved: !data.reserved };
          }
          return data;
        });

        appContext.setSelectedTime(newReservationArray);
      }
    }
  };

  //DOM - timeblocks
  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div
        key={block.id}
        className="text-xs w-20 h-10 border border-yellow-700 bg-white rounded-md flex justify-center items-center"
      >
        {block.time}
      </div>
    );
  });

  //DOM - podle room
  const roomDom = appContext?.selectedRoom.roomData.map((roomData: any) => {
    const selectedBlock = appContext?.selectedTime?.find(
      (room: any) => room.block == roomData.block
    );
    return (
      <div
        key={roomData.block}
        className={`h-10 rounded-md flex justify-center items-center ${
          roomData.reserved ? "bg-red-600" : "bg-white"
        }  w-20 text-xs border border-green-600`}
        onClick={() => onClickHandler(roomData.block)}
        //Style, protože Tailwind neumožňuje jednoduché dynamické formátování (zde v případě, že se vybere block, tak se změní bgColor)
        style={{
          backgroundColor: selectedBlock?.reserved ? "#23895d" : "white",
        }}
      >
        {roomData.block}
      </div>
    );
  });

  //Konečný return - 2 sloupce 1. s časovými bloky, 2. vybraná místnost
  return (
    <section className="grid grid-cols-2 gap-1 ">
      <div>{timeBlocksDom}</div>
      <div>{roomDom}</div>
    </section>
  );
};

export default TimeSelect;
