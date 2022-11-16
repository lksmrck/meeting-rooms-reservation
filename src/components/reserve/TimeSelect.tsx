import React, { useContext, useEffect, useState } from "react";
import { timeBlocks } from "../../common/dummyData";
/* import AppContext from "../../state/AppContext"; */
import ReservationContext from "../../state/ReservationContext";
import { meetingsFetch } from "./meetingsFetch";
import MeetingDetail from "../meetingDetail/MeetingDetail";

/* ZDE SLEDOVAT V LOKÁLNÍM STATE MÍSTO CONTEXTU???? - SELECTEDTIME */
const TimeSelect: React.FC = () => {
  /*   const appContext = useContext(AppContext); */
  const reservationContext = useContext(ReservationContext);

  const { pickedRoom, setPickedRoom } = reservationContext;

  const [selectedBlocks, setSelectedBlocks] = useState(0);
  //Meeting details:
  //Detail meetingů v daném dnu ve vybrané místnosti
  const [meetingsDetail, setMeetingsDetail] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedMeeting, setClickedMeeting] = useState();

  /*  useEffect(() => {
   
    priradit do setPickedRoom z localstate az tam pridam 
  }, []); */
  const [myPickedRoom, setMyPickedRoom] = useState(pickedRoom);

  //Počítadlo vybraných bloků k rezervaci - s každým vybraným blokem přičte 1 do local state,
  useEffect(() => {
    setSelectedBlocks(0);
    const counter = pickedRoom.roomData.map((data: any) => {
      if (data.selected) {
        setSelectedBlocks((prevState: number) => prevState + 1);
      }
    });
  }, [pickedRoom]);

  useEffect(() => {
    meetingsFetch("secondCompany", "22.11.2022", setMeetingsDetail);
  }, []);

  const onClickHandler = (blockNumber: number): void | null => {
    //Logika -> Vybírá se právě 1 schůzka. Tzn, že lze vybírat jen souvislé časové bloky - nelze vybrat např. blok 7:00-7:30 a k tomu 12:00-12:30,
    //ale lze vybrat postupně všechny bloky od 7:00 až do 12:30.
    console.log(meetingsDetail);
    //Podminky
    //0.Pokud se klikne na rezerovavný block, tak zbytek funkce nepokračuje a neudělá nic.
    const clickReservedCheck = pickedRoom.roomData.find((room: any) => {
      return room.block == blockNumber && room.reserved;
    });

    if (clickReservedCheck) {
      meetingsDetail.forEach((detail: any) => {
        if (detail.blocks.includes(blockNumber)) {
          setClickedMeeting(detail);
        }
      });
      setOpenDetail(true);
    }

    //1. Pokud ještě není vybrán žádný blok, lze kliknout na kterýkoliv a vybrat.
    if (!clickReservedCheck && pickedRoom && selectedBlocks == 0) {
      const updatedRoomData = pickedRoom.roomData.map((data: any) => {
        if (data.block == blockNumber) {
          return { ...data, selected: !data.selected };
        }
        return data;
      });
      const updatedRoom = { ...pickedRoom, roomData: updatedRoomData };

      setPickedRoom(updatedRoom);
    }
    //2. Pokud je právě 1 vybraný blok, tak lze vybrat pouze blok+1 nebo blok-1 nebo odvybrat vybraný blok
    if (!clickReservedCheck && pickedRoom && selectedBlocks == 1) {
      const reservedBlock = pickedRoom.roomData.filter((obj: any) => {
        return obj.selected;
      }); //uložen rezervovaný object

      if (
        blockNumber == reservedBlock[0].block ||
        blockNumber == reservedBlock[0].block + 1 ||
        blockNumber == reservedBlock[0].block - 1
      ) {
        const updatedRoomData = pickedRoom.roomData.map((data: any) => {
          if (data.block == blockNumber) {
            return { ...data, selected: !data.selected };
          }
          return data;
        });
        const updatedRoom = { ...pickedRoom, roomData: updatedRoomData };

        setPickedRoom(updatedRoom);
      }
    }
    //3. Pokud je více než 1 vybraný blok, tak:
    if (!clickReservedCheck && pickedRoom && selectedBlocks > 1) {
      //Vyfiltorvání bloků, u kterých je selected = true
      const newSelectedBlocks = pickedRoom.roomData.filter((obj: any) => {
        return obj.selected;
      });
      // 3.1 Získám nejmenší block ID (n) (pak půjde kliknout pouze n-1 (přidat) nebo n (odebrat))
      const minBlock = Math.min(
        ...newSelectedBlocks.map((obj: any) => {
          return obj.block;
        })
      );
      // 3.2. Získám největší block ID (n) (pak půjde kliknout pouze n+1 (přidat) nebo n (odebrat))
      const maxBlock = Math.max(
        ...newSelectedBlocks.map((obj: any) => {
          return obj.block;
        })
      );

      if (
        blockNumber == minBlock - 1 ||
        blockNumber == maxBlock + 1 ||
        blockNumber == minBlock ||
        blockNumber == maxBlock
      ) {
        const updatedRoomData = pickedRoom.roomData.map((data: any) => {
          if (data.block == blockNumber) {
            return { ...data, selected: !data.selected };
          }
          return data;
        });
        const updatedRoom = { ...pickedRoom, roomData: updatedRoomData };

        setPickedRoom(updatedRoom);
      }
    }
  };

  //DOM PRO TIMEBLOCKY - timeblocks
  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div
        key={block.id}
        className="text-xs w-20 h-10 border border-yellow-700 bg-white rounded-md flex justify-center items-center shadow-lg shadow-slate-600"
      >
        {block.time}
      </div>
    );
  });

  // DOM PRO ROOM - Const ve které je DOM, už roztříděný podle meetingů, kde divy mají alkované rozměry, podle toho, jaké meetingy v daném dnu jsou.
  let meetingsHelper: number[] = [];
  //Const pro sloupec s timeblocky dané místnosti - zobrazení tak, aby meetingy tvořily jeden velký blok a nerezervované bloky byly samostatně.
  const roomDom = pickedRoom.roomData.map((roomData: any) => {
    const selectedBlock = pickedRoom.roomData?.find(
      (room: any) => room.block == roomData.block
    );
    let height;

    //Check zda bloky v meetingBlocks u každého bloku jsou obsaženy v meetingsHelper array.
    const includedInHelper = meetingsHelper.some((no: number) =>
      roomData.meetingBlocks.includes(no)
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
          onClick={() => onClickHandler(roomData.block)}
          className={` bg-blue-700 -ml-2 rounded-md flex justify-center items-center w-28 text-xs border border-green-600 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
          //Inline styling, kvůli problémům s dynamickým stylováním přes tailwind.
          style={{ height: `${height}rem` }}
        >
          Reserved
        </div>
      );
    }
    return (
      <div
        key={roomData.block}
        onClick={() => onClickHandler(roomData.block)}
        className={`h-10 -ml-2 rounded-md flex justify-center items-center w-28 text-xs border border-green-600 cursor-pointer hover:scale-105 shadow-lg shadow-slate-600`}
        style={{
          backgroundColor: selectedBlock.selected ? "green" : "white",
        }}
      >
        Free
      </div>
    );
  });

  //Konečný return - 2 sloupce 1. s časovými bloky, 2. vybraná místnost
  return (
    <section className="grid grid-cols-2">
      <div>{timeBlocksDom}</div>
      <div>{roomDom}</div>
      {openDetail && (
        <MeetingDetail
          clickedMeeting={clickedMeeting}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
        />
      )}
    </section>
  );
};

export default TimeSelect;
