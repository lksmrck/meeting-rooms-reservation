import { Dispatch, SetStateAction, FC } from "react";
import { useRoomsAdminFncs } from "../../../hooks/useRoomsAdminFncs";
import { CompanyRoom } from "../../../types/types";
import AddRoomForm from "../../../components/admin/rooms/AddRoomForm";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

type AddRoomModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<CompanyRoom[]>>;
  rooms: CompanyRoom[];
};

const AddRoomModal: FC<AddRoomModalProps> = ({
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
    <Modal isOpen={isOpen} onClose={onCancel} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <AddRoomForm
          isLoading={isLoading}
          addRoomHandler={addRoomHandler}
          onCancel={onCancel}
        />
      </ModalContent>
    </Modal>
  );
};

export default AddRoomModal;
