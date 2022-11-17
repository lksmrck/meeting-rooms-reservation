import { timeBlocks } from "../../common/dummyData";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReservationContext from "../../state/ReservationContext";
import AuthContext from "../../state/AuthContext";
import RoomsDom from "./RoomsDom";
import { roomsMeetingsFetch } from "./roomsMeetingsFetch";

const Overview = () => {
  //Array s infem o firemních místnostech (ID, name)
  const [companyRooms, setCompanyRooms] = useState<any>([]);
  //Detailní info o rooms + blocks + meetings ve vybraném dnu
  const [roomsData, setRoomsData] = useState<any>([]);

  const reservationContext = useContext(ReservationContext);
  const authContext = useContext(AuthContext);

  const { setPickedBlock, pickedDate, setPickedRoom } = reservationContext;

  const { user, company } = authContext;
  const navigate = useNavigate();
  /*  const { isLoading, setIsLoading } = appContext; */

  //1. Firebase query - stáhne všechny rooms za danou firmu včetně meetingů a zpracované meetingy vč. upravených objektů o meetingy ve vybraném dnu uloží do state. Viz. funkce..
  useEffect(() => {
    roomsMeetingsFetch(
      "secondCompany", //upravit na company
      pickedDate,
      setCompanyRooms,
      setRoomsData
    );
    console.log(roomsData);
  }, []);

  const onClickBlockHandler = (room: number, block: number): void => {
    console.log(roomsData);
    //Uloží do Contextu room a block, na které user clicknul, aby se dalo pak použít v detailní rezervaci jako přednastaveno
    setPickedBlock({ room, block });
    const clickedRoom = roomsData.find((roomData: any) => {
      return roomData.id == room;
    });
    //přidána property selected: false ke každému bloku. U reserve se tam bude přidělovat kliknutí a podle toho se barvit.
    const adjustedRoomData = clickedRoom.roomData.map((data: any) => {
      return { ...data, selected: false };
    });
    const adjustedClickedRoom = { ...clickedRoom, roomData: adjustedRoomData };

    setPickedRoom(adjustedClickedRoom);
    navigate("/reserve");
  };

  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div
        key={block.id}
        className=" flex justify-center items-center text-xs w-20 h-10  border border-yellow-700 rounded-md bg-gray-200 shadow-lg shadow-slate-600"
      >
        {block.time}
      </div>
    );
  });

  //Vypočítá šířku celého obsahu podle počtu místnosti - = 5rem) na místnost + 5rem za time blocks.
  const roomsNumber = roomsData.length;
  const displayWidth = roomsNumber * 5 + 5;

  //Počet sloupců pro GRID
  const displayCols = roomsNumber + 1;

  return (
    <div className="flex justify-center bg-gradient-to-r from-violet-300 to-violet-400 ">
      <section
        className="grid gap-5"
        //Custom in-line style, protože Tailwind neumožňuje dynamic styling - takto udělá grid podle počtu místností (const displayCols) a přidá dynamicky width contentu.
        style={{
          gridTemplateColumns: `repeat(${displayCols}, minmax(0, 1fr))`,
          width: `${displayWidth}rem`,
        }}
      >
        <div className=" -mt-0.5 ">
          {" "}
          <h1>Time</h1>
          {timeBlocksDom}
        </div>
        <RoomsDom
          roomsData={roomsData}
          onClickBlockHandler={onClickBlockHandler}
        />
      </section>
    </div>
  );
};

export default Overview;
