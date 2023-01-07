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
import { useNavigate, useParams } from "react-router-dom";
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
  //Datum + roomID z params
  const { pickedDate, pickedRoomId } = useParams();
  const formatedPickedDate = paramsToDate(pickedDate!);

  const { pickedRoom, setPickedRoom, roomsData } =
    useContext(ReservationContext);
  const { isContextLoading } = useContext(AppContext);

  const [selectedBlocks, setSelectedBlocks] = useState(0);

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

  //Meeting details:
  //Detail meetingů v daném dnu ve vybrané místnosti
  const [meetingsDetail, setMeetingsDetail] = useState([] as Meeting[]);
  const [openDetail, setOpenDetail] = useState(false);
  const [clickedMeeting, setClickedMeeting] = useState({} as Meeting);

  const { fetchMeetings, isLoading } = useMeetingsFetch();

  //Počítadlo vybraných bloků k rezervaci - s každým vybraným blokem přičte 1 do local state,
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

  const blockClickHandler = (blockNumber: number): void | null => {
    //Logika -> Vybírá se právě 1 schůzka. Tzn, že lze vybírat jen souvislé časové bloky - nelze vybrat např. blok 7:00-7:30 a k tomu 12:00-12:30,
    //ale lze vybrat postupně všechny bloky od 7:00 až do 12:30.

    //Podminky
    //0.Pokud se klikne na rezerovavný block, tak zbytek funkce nepokračuje a místo toho zobrazí meeting
    const clickReservedCheck = pickedRoom.roomData.find((room: RoomData) => {
      return room.block == blockNumber && room.reserved;
    });

    if (clickReservedCheck) {
      meetingsDetail.forEach((detail: Meeting) => {
        if (detail.blocks.includes(blockNumber)) {
          setClickedMeeting(detail);
        }
      });
      setOpenDetail(true);
    }

    //1. Pokud ještě není vybrán žádný blok, lze kliknout na kterýkoliv a vybrat.
    if (!clickReservedCheck && pickedRoom && selectedBlocks == 0) {
      const updatedRoom = updateRoomData(pickedRoom, blockNumber);
      setPickedRoom(updatedRoom);
    }
    //2. Pokud je právě 1 vybraný blok, tak lze vybrat pouze blok+1 nebo blok-1 nebo odvybrat vybraný blok
    if (!clickReservedCheck && pickedRoom && selectedBlocks == 1) {
      const reservedBlock = pickedRoom.roomData.filter((data: RoomData) => {
        return data.selected;
      }); //uložen rezervovaný object

      if (
        blockNumber == reservedBlock[0].block ||
        blockNumber == reservedBlock[0].block + 1 ||
        blockNumber == reservedBlock[0].block - 1
      ) {
        removeBlocksError();
        const updatedRoom = updateRoomData(pickedRoom, blockNumber);
        setPickedRoom(updatedRoom);
      } else {
        setBlocksError();
      }
    }
    //3. Pokud je více než 1 vybraný blok, tak:
    if (!clickReservedCheck && pickedRoom && selectedBlocks > 1) {
      //Vyfiltorvání bloků, u kterých je selected = true
      const newSelectedBlocks = pickedRoom.roomData.filter((data: RoomData) => {
        return data.selected;
      });
      // 3.1 Získám nejmenší block ID (n) (pak půjde kliknout pouze n-1 (přidat) nebo n (odebrat))
      const minBlock = Math.min(
        ...newSelectedBlocks.map((obj: RoomData) => {
          return obj.block;
        })
      );
      // 3.2. Získám největší block ID (n) (pak půjde kliknout pouze n+1 (přidat) nebo n (odebrat))
      const maxBlock = Math.max(
        ...newSelectedBlocks.map((obj: RoomData) => {
          return obj.block;
        })
      );

      if (
        blockNumber == minBlock - 1 ||
        blockNumber == maxBlock + 1 ||
        blockNumber == minBlock ||
        blockNumber == maxBlock
      ) {
        removeBlocksError();
        const updatedRoom = updateRoomData(pickedRoom, blockNumber);
        setPickedRoom(updatedRoom);
      } else {
        setBlocksError();
      }
    }
  };

  //Konečný return - 2 sloupce 1. s časovými bloky, 2. vybraná místnost
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
          onClick={() => navigate(`/date/${pickedDate}/overview`)}
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
