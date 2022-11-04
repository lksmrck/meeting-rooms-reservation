import { timeBlocks, rooms } from "../../common/dummyData";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ReservationContext from "../../state/ReservationContext";
import AuthContext from "../../state/AuthContext";

const Overview = () => {
  //Tady bude dispatch, kdy se stáhnout data z Firebase na základě datumu v ReservationContext a Firmy.
  //Rooms budou defaultně nerezervované. Pouze rezervace se budou ukládat.

  const navigate = useNavigate();

  const reservationContext = useContext(ReservationContext);
  const authContext = useContext(AuthContext);
  if (!reservationContext) return null;
  const { setPickedBlock } = reservationContext;

  if (!authContext) return null;
  const { user } = authContext;
  console.log(user.email);

  const onClickBlockHandler = (room: number, block: number): void => {
    //Uloží do Contextu room a block, na které user clicknul, aby se dalo pak použít v detailní rezervaci jako přednastaveno
    setPickedBlock({ room, block });
    /*  navigate("/reserve"); */
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

  //Vypočítá šířku celého obsahu podle počtu místnosti - = 5rem) na místnost + 5rem za time blocks.
  const roomsNumber = rooms.length;
  const displayWidth = roomsNumber * 5 + 5;

  //Počet sloupců pro GRID
  const displayCols = roomsNumber + 1;

  //Vytvoří DOM pro místnosti uzpůsobený pro Grid
  const roomsDom = rooms.map((room) => {
    return (
      <div key={room.id}>
        {room.roomData.map((roomData) => {
          return (
            <div
              key={roomData.block}
              className={`h-10 ${
                roomData.reserved ? "bg-red-600" : "bg-white"
              } w-20 text-xs border border-green-600`}
              onClick={() => onClickBlockHandler(room.id, roomData.block)}
            >
              {roomData.room}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <section
      className={`grid`}
      //Custom in-line style, protože Tailwind neumožňuje dynamic styling - takto udělá grid podle počtu místností (const displayCols) a přidá dynamicky width contentu.
      style={{
        gridTemplateColumns: `repeat(${displayCols}, minmax(0, 1fr))`,
        width: `${displayWidth}rem`,
      }}
    >
      <div className="border border-blue-400">{timeBlocksDom}</div>
      {roomsDom}
    </section>
  );
};

export default Overview;
