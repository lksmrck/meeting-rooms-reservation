import React, { useContext, useEffect, useState } from "react";
/* import AppContext from "../../state/AppContext"; */
import ReservationContext from "../../state/ReservationContext";
import { meetingsFetch } from "./meetingsFetch";
import MeetingDetail from "../meetingDetail/MeetingDetail";
import OneRoomDom from "./OneRoomDom";
import { useNavigate } from "react-router-dom";
import TimeBlocksDom from "../overview/TimeBlocksDom";
import { Meeting } from "../../types/types";

/* ZDE SLEDOVAT V LOKÁLNÍM STATE MÍSTO CONTEXTU???? - SELECTEDTIME */
const TimeSelect: React.FC = () => {
  const navigate = useNavigate();
  /*   const appContext = useContext(AppContext); */
  const reservationContext = useContext(ReservationContext);

  const { pickedRoom, setPickedRoom, pickedDate } = reservationContext;

  const [selectedBlocks, setSelectedBlocks] = useState(0);
  //Meeting details:
  //Detail meetingů v daném dnu ve vybrané místnosti
  const [meetingsDetail, setMeetingsDetail] = useState([] as Meeting[]);
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedMeeting, setClickedMeeting] = useState({} as Meeting);

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
    meetingsFetch(
      "secondCompany",
      pickedDate,
      setMeetingsDetail,
      pickedRoom.id
    );
  }, []);

  const blockClickHandler = (blockNumber: number): void | null => {
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

  //Konečný return - 2 sloupce 1. s časovými bloky, 2. vybraná místnost
  return (
    <section className="grid grid-cols-2">
      <div>
        <TimeBlocksDom />
      </div>
      <div>
        <OneRoomDom
          pickedRoom={pickedRoom}
          blockClickHandler={blockClickHandler}
        />
      </div>
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
