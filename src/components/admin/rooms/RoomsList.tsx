import { useState, useEffect } from "react";
import { useRoomsAdminFncs } from "../../../hooks/use-roomsAdminFncs";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  const { roomsFetch, addRoom, deleteRoom, isLoading } = useRoomsAdminFncs();

  useEffect(() => {
    roomsFetch("secondCompany", setRooms);
  }, []);

  const addRoomHandler = () => {
    addRoom("secondCompany", rooms, setRooms);
  };

  const deleteRoomHandler = (roomId: any) => {
    deleteRoom("secondCompany", roomId, setRooms);
  };

  return (
    <div className="ml-2 lg:w-screen flex justify-center flex-col items-center ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ul className="lg:w-2/12 w-4/5 border shadow-md rounded-lg bg-slate-300 ">
            {rooms.map((room: any) => {
              return (
                <div className="flex mt-1 border-b-2">
                  <li className="w-4/5 ml-1 mb-1" key={room.id}>
                    {room.name}
                  </li>
                  <div className="  w-1/5 flex justify-end mb-1 ">
                    <IconButton
                      aria-label="plus"
                      colorScheme="red"
                      icon={
                        <AiOutlineMinusSquare
                          size={15}
                          style={{ color: "#f0fdf4" }}
                        />
                      }
                      onClick={() => {
                        deleteRoomHandler(room.id);
                      }}
                      className=" w-5 mr-2"
                      size="xs"
                    />
                  </div>
                </div>
              );
            })}
          </ul>
          <IconButton
            aria-label="plus"
            colorScheme="facebook"
            icon={
              <AiOutlinePlusSquare size={25} style={{ color: "#f0fdf4" }} />
            }
            onClick={addRoomHandler}
            className="h-10 w-10 mt-2"
            size="md"
          />
        </>
      )}
    </div>
  );
};

export default RoomsList;
