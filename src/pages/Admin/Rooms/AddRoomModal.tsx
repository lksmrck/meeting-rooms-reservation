import React, { Dispatch, SetStateAction } from "react";
import { useRoomsAdminFncs } from "../../../hooks/useRoomsAdminFncs";
import { CompanyRoom } from "../../../types/types";
import AddRoomForm from "../../../components/admin/rooms/AddRoomForm";

type AddRoomModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<CompanyRoom[]>>;
  rooms: CompanyRoom[];
};

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  setIsOpen,
  setRooms,
  rooms,
}) => {
  const { addRoom, roomsFetch, isLoading } = useRoomsAdminFncs();

  const addRoomHandler = (formData: string): void => {
    addRoom(rooms, formData)
      .then(() => roomsFetch(setRooms))
      .then(() => setIsOpen(false));
  };

  const onCancel = (): void => {
    setIsOpen(false);
  };

  return (
    <AddRoomForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isLoading={isLoading}
      addRoomHandler={addRoomHandler}
      onCancel={onCancel}
    />
  );
};

export default AddRoomModal;
