import { useState, useEffect } from "react";
import { useRoomsAdminFncs } from "../../../hooks/use-roomsAdminFncs";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import AddRoomModal from "./AddRoomModal";
import { Button } from "@chakra-ui/react";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);

  const { roomsFetch, addRoom, deleteRoom, isLoading } = useRoomsAdminFncs();

  useEffect(() => {
    roomsFetch(setRooms);
  }, []);

  const deleteRoomHandler = (roomId: any) => {
    deleteRoom(roomId, setRooms);
  };

  return (
    <div className="ml-2 lg:w-screen flex justify-center flex-col items-center ">
      {isLoading ? (
        <LoadingSpinner />
      ) : addRoomModalOpen ? (
        <AddRoomModal
          isOpen={addRoomModalOpen}
          setIsOpen={setAddRoomModalOpen}
          setRooms={setRooms}
          rooms={rooms}
        />
      ) : (
        <>
          <ul className="lg:w-4/12 w-4/5 mt-4  ">
            <li className="flex mt-1 border-b-2 bg-slate-500 rounded-md shadow-sm">
              <h1 className="font-bold w-4/5 ml-1 mb-1">Room name</h1>
            </li>
            {rooms.map((room: any) => {
              return (
                <li className="flex mt-1 border-b-2 bg-slate-300 rounded-md shadow-sm">
                  <h1 className="w-4/5 ml-1 mb-1" key={room.id}>
                    {room.name}
                  </h1>
                  <div className="w-1/5 flex justify-end mb-1 ">
                    <IconButton
                      aria-label="plus"
                      colorScheme="red"
                      icon={
                        <AiOutlineMinusCircle
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
                </li>
              );
            })}
          </ul>

          <Button
            colorScheme="facebook"
            leftIcon={
              <AiOutlinePlusCircle size={25} style={{ color: "#f0fdf4" }} />
            }
            onClick={() => setAddRoomModalOpen(true)}
            className="mt-2"
          >
            Add room
          </Button>
        </>
      )}
    </div>
  );
};

export default RoomsList;
