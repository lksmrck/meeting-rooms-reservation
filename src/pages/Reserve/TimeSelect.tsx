import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import ReservationContext from "../../state/ReservationContext";
import { useMeetingsFetch } from "../../hooks/useMeetingsFetch";
import MeetingDetail from "./MeetingDetail";
import OneRoomDom from "./OneRoomDom";
import { useNavigate, useSearchParams } from "react-router-dom";
import TimeBlocksDom from "../../components/timeBlocks/TimeBlocksDom";
import { Meeting, RoomData } from "../../types/types";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import { paramsToDate } from "../../utils/dateParamsFormat";
import { updateRoomData } from "../../utils/updateRoomData";
import AppContext from "../../state/AppContext";
import { displayedRoomName } from "../../utils/displayedRoomName";

type TimeSelectProps = {
  setBlocksPickError: Dispatch<
    SetStateAction<{ error: boolean; message: string }>
  >;
};

const TimeSelect: FC<TimeSelectProps> = ({ setBlocksPickError }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const pickedRoomId = searchParams.get("room");
  const pickedDate = searchParams.get("date");

  const formatedPickedDate = paramsToDate(pickedDate!);

  const { pickedRoom, setPickedRoom } = useContext(ReservationContext);
  const { isContextLoading } = useContext(AppContext);

  const [selectedBlocks, setSelectedBlocks] = useState(0);

  const [meetingsDetail, setMeetingsDetail] = useState([] as Meeting[]);
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedMeeting, setClickedMeeting] = useState({} as Meeting);

  const { fetchMeetings, isLoading } = useMeetingsFetch();

  //Calculation of picked blocks
  useEffect(() => {
    let isCurrent = true;
    if (!isCurrent) return;
    setSelectedBlocks(0);
    pickedRoom.roomData.forEach((data: RoomData) => {
      if (data.selected) {
        setSelectedBlocks((prevState: number) => prevState + 1);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [pickedRoom]);

  useEffect(() => {
    let isCurrent = true;
    if (!isCurrent) return;
    fetchMeetings(
      formatedPickedDate,
      setMeetingsDetail,
      pickedRoomId as string
    );

    return () => {
      isCurrent = false;
    };
  }, []);

  const setBlocksError = () => {
    setBlocksPickError({
      error: true,
      message: "Please select only consecutive blocks.",
    });
  };

  const removeBlocksError = () => {
    setBlocksPickError({
      error: false,
      message: "",
    });
  };

  const blockClickHandler = (blockNumber: number): void | null => {
    //Logic: Only one meeting can be reserved at the time, therefore user needs to pick only consecutive time blocks.

    //Conditoons:
    //0. If user clicks on already reserved block -> That already reserved meeting is shown:
    const clickReservedCheck = pickedRoom.roomData.find((room: RoomData) => {
      return room.block === blockNumber && room.reserved;
    });

    if (clickReservedCheck) {
      meetingsDetail.forEach((detail: Meeting) => {
        if (detail.blocks.includes(blockNumber)) {
          setClickedMeeting(detail);
        }
      });
      setOpenDetail(true);
    }

    //1. If there is no block picked yet, user can click on every block:
    if (!clickReservedCheck && pickedRoom && selectedBlocks === 0) {
      const updatedRoom = updateRoomData(pickedRoom, blockNumber);
      setPickedRoom(updatedRoom);
    }
    //2. If there is 1 block already picked, user can pick only block+1 or block-1 or remove already picked block:
    if (!clickReservedCheck && pickedRoom && selectedBlocks === 1) {
      const reservedBlock = pickedRoom.roomData.filter((data: RoomData) => {
        return data.selected;
      });

      if (
        blockNumber === reservedBlock[0].block ||
        blockNumber === reservedBlock[0].block + 1 ||
        blockNumber === reservedBlock[0].block - 1
      ) {
        removeBlocksError();
        const updatedRoom = updateRoomData(pickedRoom, blockNumber);
        setPickedRoom(updatedRoom);
      } else {
        setBlocksError();
      }
    }
    //3. If there is more than 1 picked block:
    if (!clickReservedCheck && pickedRoom && selectedBlocks > 1) {
      const newSelectedBlocks = pickedRoom.roomData.filter((data: RoomData) => {
        return data.selected;
      });
      //3.1 Lowest of picked blockIDs (n), and then user can click only on n-1 (add) or n (remove):
      const minBlock = Math.min(
        ...newSelectedBlocks.map((obj: RoomData) => {
          return obj.block;
        })
      );
      //3.2 Highest of picked blockIDs (n), and then user can click only on n+1 (add) or n (remove):
      const maxBlock = Math.max(
        ...newSelectedBlocks.map((obj: RoomData) => {
          return obj.block;
        })
      );

      if (
        blockNumber === minBlock - 1 ||
        blockNumber === maxBlock + 1 ||
        blockNumber === minBlock ||
        blockNumber === maxBlock
      ) {
        removeBlocksError();
        const updatedRoom = updateRoomData(pickedRoom, blockNumber);
        setPickedRoom(updatedRoom);
      } else {
        setBlocksError();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-ml-2">
        <p
          className="border rounded-md mx-auto md:mx-2 w-56  bg-purple-600 hover:bg-purple-700 flex justify-center  text-white  font-solid text-xl cursor-pointer"
          onClick={() => navigate("/datepick")}
        >
          {formatedPickedDate}
        </p>
        <p
          className="border rounded-md mx-auto md:mx-2 w-56  bg-purple-600 hover:bg-purple-700 flex justify-center  text-white mb-2 font-solid text-xl cursor-pointer overflow-auto scrollbar-hide"
          onClick={() =>
            navigate({ pathname: `/overview`, search: `?date=${pickedDate}` })
          }
        >
          {displayedRoomName(pickedRoom.name, 23)}
        </p>
      </div>
      <section className="grid grid-cols-2 mx-auto md:mx-0 ">
        <div className="w-28">
          <div className="flex font-bold justify-center items-center text-sm mb-1 w-24 h-10 border border-stone-700 rounded-md bg-purple-500 text-white shadow-md shadow-slate-600 ">
            Time
          </div>
          <TimeBlocksDom />
        </div>
        <div className="ml-1">
          {isLoading || isContextLoading ? (
            <div className="w-28 -ml-2">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="w-28">
              <div className="flex  font-bold justify-center items-center text-sm w-28 -ml-2 mb-1 h-10 border border-stone-700 rounded-md bg-purple-500 text-white shadow-md shadow-slate-600 ">
                Availability
              </div>
              <OneRoomDom
                pickedRoom={pickedRoom}
                blockClickHandler={blockClickHandler}
              />
            </div>
          )}
        </div>
        {openDetail && (
          <MeetingDetail
            clickedMeeting={clickedMeeting}
            openDetail={openDetail}
            setOpenDetail={setOpenDetail}
            setMeetingsDetail={setMeetingsDetail}
          />
        )}
      </section>
    </div>
  );
};

export default TimeSelect;
