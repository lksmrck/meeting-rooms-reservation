import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import AuthContext from "../../state/AuthContext";
import ReservationContext from "../../state/ReservationContext";
import { useRemoveMeeting } from "../../hooks/use-removeMeeting";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import DetailDomEditMode from "./DetailDomEditMode";
import DetailDom from "./DetailDom";
import { timeToBlocks } from "../../utils/timeToBlocks";

type MeetingDetailProps = {
  clickedMeeting: Meeting;
  openDetail: boolean;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
};

const MeetingDetail: React.FC<MeetingDetailProps> = ({
  clickedMeeting,
  openDetail,
  setOpenDetail,
}) => {
  //Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(clickedMeeting);
  const [updatedTime, setUpdatedTime] = useState({
    /* start: "", end: ""  */
  });
  const [updatedGuests, setUpdatedGuests] = useState(updatedMeeting.guests);

  //State na local loading - aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated)
  const [fbIsLoading, setFbIsLoading] = useState(false);

  const { company, user } = useContext(AuthContext);
  const { pickedDate, pickedRoom } = useContext(ReservationContext);

  const { removeData, isLoading } = useRemoveMeeting();

  const navigate = useNavigate();

  const onCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setUpdatedTime({});
      setUpdatedMeeting(clickedMeeting);
    } else {
      setOpenDetail(false);
    }
  };

  const deleteMeetingHandler = (e: React.SyntheticEvent) => {
    setFbIsLoading(true);
    removeData("secondCompany", clickedMeeting, pickedRoom.id);
    //Timeout aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated) - byly problémy s načítáním dat po odstranění mtg.
    setTimeout(() => {
      navigate("/overview");
      setFbIsLoading(false);
      setOpenDetail(false);
    }, 1000);
  };

  const editModeToggler = () => {
    setIsEditing(true);
  };

  const onChangeMeeting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMeeting({ ...updatedMeeting, [e.target.name]: e.target.value });
    console.log(updatedMeeting);
  };

  const submitUpdatedMeeting = (e: any) => {
    const { id, date, name, type } = updatedMeeting;

    e.preventDefault();

    const blocks = timeToBlocks(updatedTime);

    const formData: any = {
      id,
      date,
      name,
      type,
      room: pickedRoom.id,
      blocks,
      creator: user!.email,
      guests: updatedGuests,
    };
    console.log(formData);
  };

  return (
    <Modal isOpen={openDetail} onClose={() => setOpenDetail(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meeting detail</ModalHeader>
        <ModalCloseButton />
        {fbIsLoading || isLoading ? (
          <LoadingSpinner />
        ) : (
          <ModalBody pb={6}>
            {isEditing ? (
              <DetailDomEditMode
                onChangeMeeting={onChangeMeeting}
                updatedMeeting={updatedMeeting}
                updatedTime={updatedTime}
                setUpdatedTime={setUpdatedTime}
                setUpdatedGuests={setUpdatedGuests}
              />
            ) : (
              <DetailDom clickedMeeting={clickedMeeting} />
            )}
          </ModalBody>
        )}

        <ModalFooter className="[&>button]:m-1 ">
          {!isEditing && (
            <Button colorScheme="red" onClick={deleteMeetingHandler}>
              Delete
            </Button>
          )}
          {/* Edit button se zobrazí pouze, pokud user = tvůrce meetingu */}
          {isEditing && (
            <Button
              colorScheme="teal"
              onClick={submitUpdatedMeeting}
              type="submit"
            >
              Update meeting
            </Button>
          )}
          {clickedMeeting.creator == user!.email && !isEditing && (
            <Button colorScheme="orange" onClick={editModeToggler}>
              Edit
            </Button>
          )}
          <Button onClick={onCancel}>Back</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingDetail;
