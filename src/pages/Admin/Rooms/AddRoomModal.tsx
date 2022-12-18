import React, { useState, Dispatch, SetStateAction } from "react";
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
  const [formData, setFormData] = useState("");

  const { addRoom, roomsFetch, isLoading } = useRoomsAdminFncs();

  const addRoomHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addRoom(rooms, formData)
      .then(() => roomsFetch(setRooms))
      .then(() => setIsOpen(false));
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  return (
    <AddRoomForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isLoading={isLoading}
      onChange={inputChangeHandler}
      formData={formData}
      addRoomHandler={addRoomHandler}
      onCancel={onCancel}
    />
  );
};

export default AddRoomModal;
