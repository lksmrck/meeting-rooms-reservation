import { timeBlocks, rooms, roomData } from "../../common/dummyData";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReservationContext from "../../state/ReservationContext";
import AuthContext from "../../state/AuthContext";
import AppContext from "../../state/AppContext";
import { Button } from "@chakra-ui/react";
import { companyRoomsFetch } from "./companyRoomsFetch";
import { companyMeetingsFetch } from "./companyMeetingsFetch";

const Overview = () => {
  const [roomsData, setRoomsData] = useState<any>([]);
  const navigate = useNavigate();
  const [companyRooms, setCompanyRooms] = useState<any>([]);

  const reservationContext = useContext(ReservationContext);
  const authContext = useContext(AuthContext);

  const { setPickedBlock, pickedDate, setPickedDate, setPickedRoom } =
    reservationContext;

  const { user, company } = authContext;

  /*  const { isLoading, setIsLoading } = appContext; */

  //1. Firebase query - stáhne všechny rooms za danou firmu.
  useEffect(() => {
    companyRoomsFetch("secondCompany", setCompanyRooms);
  }, []);
  //2. Firebase query - v momentě, kdy jsou stáhnuty firemní rooms stáhne k těm rooms aktuální meetingy v daném dnu
  useEffect(() => {
    companyMeetingsFetch(
      "secondCompany",
      companyRooms,
      setRoomsData,
      pickedDate
    );
  }, [companyRooms]);

  const onClickBlockHandler = (room: number, block: number): void => {
    //Uloží do Contextu room a block, na které user clicknul, aby se dalo pak použít v detailní rezervaci jako přednastaveno
    setPickedBlock({ room, block });
    const clickedRoom = roomsData.filter((roomData: any) => {
      return roomData.id == room;
    });
    //přidána property selected: false ke každému bloku. U reserve se tam bude přidělovat kliknutí a podle toho se barvit.
    const adjustedClickedRoom = clickedRoom.map((room: any) => {
      const adjusted = room.roomData.map((data: any) => {
        return { ...data, selected: false };
      });
      return { ...room, roomData: adjusted };
    });

    setPickedRoom(adjustedClickedRoom);
    navigate("/reserve");
  };

  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div
        key={block.id}
        className=" flex justify-center items-center text-xs w-20 h-10  border border-yellow-700 rounded-md bg-gray-200"
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

  //Vytvoří DOM pro místnosti uzpůsobený pro Grid

  const roomsDom = roomsData.map((room: any) => {
    return (
      <div key={room.id} className="">
        {" "}
        {/* [&>*]:m-0.5 */}
        <h1>{room.name}</h1>
        {room.roomData.map((roomData: any) => {
          return (
            <div
              key={roomData.block}
              className={`h-10 rounded-md ${
                roomData.reserved ? "bg-red-500" : "bg-white"
              } w-20 text-xs border border-green-600 flex justify-center items-center `}
              onClick={() => onClickBlockHandler(room.id, roomData.block)}
            >
              {roomData.block}
            </div>
          );
        })}
      </div>
    );
  });

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
          {/* [&>*]:m-0.5 */}
          <h1>Time</h1>
          {timeBlocksDom}
        </div>
        {roomsDom}
      </section>
    </div>
  );
};

export default Overview;
