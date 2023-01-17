import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import ReservationContext from "../../state/ReservationContext";
import RoomsDom from "./RoomsDom";
import { useRoomsOverviewFetch } from "../../hooks/useRoomsOverviewFetch";
import TimeBlocksDom from "../../components/timeBlocks/TimeBlocksDom";
import { Room, RoomData } from "../../types/types";
import { paramsToDate } from "../../utils/dateParamsFormat";
import { FC } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../state/AuthContext";
import NoRoomYetAdded from "../../components/timeBlocks/NoRoomYetAdded";
import { useSearchParams } from "react-router-dom";

const Overview: FC = () => {
  const { setPickedRoom, roomsData } = useContext(ReservationContext);

  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const pickedDate = searchParams.get("date");

  const formatedPickedDate = paramsToDate(pickedDate!);

  const navigate = useNavigate();

  const { roomsOverviewFetch, isLoading } = useRoomsOverviewFetch();

  //1. Firebase query - stáhne všechny rooms za danou firmu včetně meetingů a zpracované meetingy vč. upravených objektů o meetingy ve vybraném dnu uloží do state. Viz. funkce..
  useEffect(() => {
    let isCurrent = true;

    if (!isCurrent) return;
    roomsOverviewFetch(user!.company, formatedPickedDate);
    return () => {
      isCurrent = false;
    };
  }, []);

  const clickBlockHandler = (room: number, block: number): void => {
    //Uloží do Contextu room a block, na které user clicknul, aby se dalo pak použít v detailní rezervaci jako přednastaveno

    const clickedRoom = roomsData.find((roomData: Room) => {
      return roomData.id === room;
    });
    //přidána property selected: false ke každému bloku. U reserve se tam bude přidělovat kliknutí a podle toho se barvit.
    const adjustedRoomData = clickedRoom!.roomData.map((data: RoomData) => {
      if (data.block === block && !data.reserved) {
        return { ...data, selected: true };
      }
      return { ...data, selected: false };
    });

    const adjustedClickedRoom = { ...clickedRoom, roomData: adjustedRoomData };
    //Pošle se vyfiltrovaná room do react contextu. Odtud se pak bere v Reserve componentu
    setPickedRoom(adjustedClickedRoom as Room);

    navigate({
      pathname: `/reserve`,
      search: `?room=${room}&date=${pickedDate}`,
    });
  };

  //Vypočítá šířku celého obsahu podle počtu místnosti - = 5rem) na místnost + 5rem za time blocks.
  const roomsNumber = roomsData.length;
  const displayWidth = roomsNumber * 5 + 5;

  //Počet sloupců pro GRID
  const displayCols = roomsNumber + 1;

  return (
    <div className="w-screen min-h-screen flex justify-center bg-gradient-to-r from-violet-300 to-violet-400  pb-5 ">
      <div
        className="flex flex-col justify-start overflow-x-auto p-4 border rounded-lg shadow-lg bg-purple-600 mt-4 scrollbar-hide  "
        style={{ minWidth: "13rem", width: `${displayWidth + 3.5}rem` }}
      >
        <p className="self-center text-white text-xl font-solid mb-2 text-center ">
          Pick a room to reserve or browse meetings
        </p>
        <p
          className="cursor-pointer self-center text-xl text-white border  bg-purple-800 hover:bg-purple-900 mb-2 rounded-md font-solid text-center "
          onClick={() => navigate("/datepick")}
          style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
        >
          {formatedPickedDate}
        </p>

        {roomsData.length > 0 ? (
          <section
            className={` ${
              isLoading ? "flex" : "grid"
            } gap-5  ml-3   `} /* mt-2 */
            //Custom in-line style, protože Tailwind neumožňuje dynamic styling - takto udělá grid podle počtu místností (const displayCols) a přidá dynamicky width contentu.
            style={{
              gridTemplateColumns: `repeat(${displayCols}, minmax(0, 1fr))`,
              minWidth: `${displayWidth}rem`,
              width: `${displayWidth}rem`,
            }}
          >
            <div className="-ml-4">
              <div className="text-sm w-24 h-10 flex justify-center items-center  border border-stone-700 rounded-md bg-emerald-900 text-white font-bold mb-1 cursor-pointer">
                Time
              </div>
              <TimeBlocksDom />
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <RoomsDom
                roomsData={roomsData}
                clickBlockHandler={clickBlockHandler}
              />
            )}
          </section>
        ) : (
          <NoRoomYetAdded />
        )}
      </div>
    </div>
  );
};

export default Overview;
