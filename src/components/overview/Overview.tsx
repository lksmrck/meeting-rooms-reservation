import { timeBlocks, rooms } from "../../common/dummyData";

const Overview = () => {
  const timeBlocksDom = timeBlocks.map((block) => {
    return (
      <div className="text-xs w-20 h-10 border border-yellow-700">
        {block.time}
      </div>
    );
  });

  //Vytvoří DOM pro místnosti uzpůsobený pro Grid
  const roomsDom = rooms.map((room) => {
    return (
      <div>
        {room.roomData.map((roomData) => {
          return (
            <div
              className={`h-10 ${
                roomData.reserved ? "bg-red-600" : "bg-white"
              } w-20 text-xs border border-green-600`}
            >
              {roomData.room}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <section className="grid grid-cols-3">
      <div className="border border-blue-400">{timeBlocksDom}</div>
      {roomsDom}
    </section>
  );
};

export default Overview;
