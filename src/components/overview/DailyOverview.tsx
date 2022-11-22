import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReservationContext from "../../state/ReservationContext";
/* import AuthContext from "../../state/AuthContext"; */
import RoomsDom from "./RoomsDom";
import { useRoomsMeetingsFetch } from "../../hooks/use-roomsMeetingsFetch";
import TimeBlocksDom from "./TimeBlocksDom";
import { CompanyRoom, Room, RoomData } from "../../types/types";
import { rooms } from "../../common/dummyData";

import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

const Overview = () => {
  //Array s infem o firemních místnostech (ID, name)
  /*   const [companyRooms, setCompanyRooms] = useState<CompanyRoom[]>([]); */
  //Detailní info o rooms + blocks + meetings ve vybraném dnu
  /* const [roomsData, setRoomsData] = useState<any[]>([]); */

  const { pickedDate, setPickedRoom, roomsData, setRoomsData } =
    useContext(ReservationContext);

  /* const { user, company } = useContext(AuthContext); */
  const navigate = useNavigate();

  const { roomsFetch, isLoading } = useRoomsMeetingsFetch();

  //1. Firebase query - stáhne všechny rooms za danou firmu včetně meetingů a zpracované meetingy vč. upravených objektů o meetingy ve vybraném dnu uloží do state. Viz. funkce..
  useEffect(() => {
    let isCurrent = true;
    if (!isCurrent) return;
    roomsFetch(
      "secondCompany", //upravit na company
      pickedDate
    );
    return () => {
      isCurrent = false;
    };
  }, []);

  const clickBlockHandler = (room: number, block: number): void => {
    //Uloží do Contextu room a block, na které user clicknul, aby se dalo pak použít v detailní rezervaci jako přednastaveno

    const clickedRoom = roomsData.find((roomData: Room) => {
      return roomData.id == room;
    });
    //přidána property selected: false ke každému bloku. U reserve se tam bude přidělovat kliknutí a podle toho se barvit.
    const adjustedRoomData = clickedRoom!.roomData.map((data: RoomData) => {
      return { ...data, selected: false };
    });
    const adjustedClickedRoom = { ...clickedRoom, roomData: adjustedRoomData };
    //Pošle se vyfiltrovaná room do react contextu. Odtud se pak bere v Reserve componentu
    setPickedRoom(adjustedClickedRoom as Room);
    navigate("/reserve");
  };

  //Vypočítá šířku celého obsahu podle počtu místnosti - = 5rem) na místnost + 5rem za time blocks.
  const roomsNumber = roomsData.length;
  const displayWidth = roomsNumber * 5 + 5;

  //Počet sloupců pro GRID
  const displayCols = roomsNumber + 1;

  //TEST
  /*  const [rooomData, setRooomData] = useState(rooms);

  const meeting = { room: 1, blocks: [3, 4, 5] };
  const clickMe = () => {
    setRooomData((prevData): any => {
      prevData[0].roomData.map((data: any) => {
        if (meeting.blocks.includes(data.block)) {
          console.log(data);
          return { ...data, reserved: false };
        }
        return data;
      });
    });
    console.log(rooomData);
  }; */

  return (
    <div className="flex justify-center bg-gradient-to-r from-violet-300 to-violet-400 ">
      <section
        className={` ${isLoading ? "flex" : "grid"} gap-5 mt-2`}
        //Custom in-line style, protože Tailwind neumožňuje dynamic styling - takto udělá grid podle počtu místností (const displayCols) a přidá dynamicky width contentu.
        style={{
          gridTemplateColumns: `repeat(${displayCols}, minmax(0, 1fr))`,
          width: `${displayWidth}rem`,
        }}
      >
        <div>
          <div className="text-xs w-20 h-10 flex justify-center items-center  border border-stone-700 rounded-md bg-emerald-700 text-white font-bold mb-1 cursor-pointer">
            Time
          </div>
          <TimeBlocksDom />
        </div>
        {isLoading ? (
          <div className="ml-10">
            <LoadingSpinner />
          </div>
        ) : (
          <RoomsDom
            roomsData={roomsData}
            clickBlockHandler={clickBlockHandler}
          />
        )}
      </section>
      {/*  <button onClick={clickMe}> CLICK</button> */}
      {/*   <div>{rooomData[0].roomData[2].reserved ? "true" : "false"}</div>
      <div>{rooomData[0].roomData[3].reserved ? "true" : "false"}</div>
      <div>{rooomData[0].roomData[4].reserved ? "true" : "false"}</div> */}
    </div>
  );
};

export default Overview;
