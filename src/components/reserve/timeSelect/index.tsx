import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
/* import AppContext from "../../state/AppContext"; */
import ReservationContext from "../../../state/ReservationContext";
import { useMeetingsFetch } from "../../../hooks/useMeetingsFetch";
import MeetingDetail from "../../meetingDetail";
import OneRoomDom from "./OneRoomDom";
import { useNavigate, useParams } from "react-router-dom";
import TimeBlocksDom from "../../overview/TimeBlocksDom";
import { Meeting, RoomData } from "../../../types/types";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import { paramsToDate } from "../../../utils/dateParamsFormat";
import { updateRoomData } from "./updateRoomData";
import AppContext from "../../../state/AppContext";

type TimeSelectProps = {
  setBlocksPickError: Dispatch<
    SetStateAction<{ error: boolean; message: string }>
  >;
};

const TimeSelect: React.FC<TimeSelectProps> = ({ setBlocksPickError }) => {
  /* const navigate = useNavigate(); */

  //Datum + roomID z params
  const { pickedDate, pickedRoomId } = useParams();
  const formatedDate = paramsToDate(pickedDate);

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
    fetchMeetings(formatedDate, setMeetingsDetail, pickedRoomId);

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
    <section className="grid grid-cols-2 mx-auto md:mx-0 ">
      <div className="w-28">
        <TimeBlocksDom />
      </div>
      <div className="ml-1">
        {isLoading || isContextLoading ? (
          <div className="w-28 -ml-2">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-28">
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
  );
};

export default TimeSelect;
