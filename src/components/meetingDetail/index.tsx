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
import useAuth from "../../hooks/useAuth";
import ReservationContext from "../../state/ReservationContext";
import { useRemoveMeeting } from "../../hooks/useRemoveMeeting";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import DetailDomEditMode from "./DetailDomEditMode";
import DetailDom from "./DetailDom";
import { timeToBlocks } from "../../utils/timeToBlocks";
import { useAddMeeting } from "../../hooks/useAddMeeting";
import { updatePickedRoom } from "../../utils/updatePickedRoom";
import { useMeetingsFetch } from "../../hooks/useMeetingsFetch";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

type MeetingDetailProps = {
  clickedMeeting: Meeting;
  openDetail: boolean;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
  setMeetingsDetail: any;
};

const MeetingDetail: React.FC<MeetingDetailProps> = ({
  clickedMeeting,
  openDetail,
  setOpenDetail,
  setMeetingsDetail,
}) => {
  //Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(clickedMeeting);
  const [updatedTime, setUpdatedTime] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });
  const [updatedGuests, setUpdatedGuests] = useState(updatedMeeting.guests);
  const [missingFormData, setMissingFormData] = useState(false);

  //State na local loading - aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated)
  const [fbIsLoading, setFbIsLoading] = useState(false);

  const { company, user } = useAuth();
  const { pickedDate, pickedRoom, setPickedRoom } =
    useContext(ReservationContext);

  const { fetchMeetings } = useMeetingsFetch();
  const { addMeeting } = useAddMeeting();
  const { removeData, isLoading } = useRemoveMeeting();

  const navigate = useNavigate();

  const onCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setUpdatedTime({ start: null, end: null });
      setMissingFormData(false);
      setUpdatedMeeting(clickedMeeting);
    } else {
      setOpenDetail(false);
      setMissingFormData(false);
    }
  };

  const deleteMeetingHandler = (e: React.SyntheticEvent) => {
    setFbIsLoading(true);
    removeData("secondCompany", clickedMeeting, pickedRoom.id).then(() => {
      navigate("/overview");
      setFbIsLoading(false);
      setOpenDetail(false);
    });
  };

  const editModeToggler = () => {
    setIsEditing(true);
  };

  const changeMeetingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMeeting({ ...updatedMeeting, [e.target.name]: e.target.value });
    if (missingFormData) setMissingFormData(false);
  };

  const submitUpdatedMeeting = (e: any) => {
    e.preventDefault();
    setMissingFormData(false);
    setFbIsLoading(true);
    const { id, date, name, type } = updatedMeeting;
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

    if (
      name.length > 0 &&
      updatedTime.start != null &&
      updatedTime.end != null
    ) {
      removeData("secondCompany", clickedMeeting, pickedRoom.id).then(() => {
        addMeeting(formData)
          .then(() => {
            fetchMeetings(
              "secondCompany",
              pickedDate,
              setMeetingsDetail,
              pickedRoom.id
            );
          })
          .then(() => {
            updatePickedRoom(
              pickedRoom,
              setPickedRoom,
              clickedMeeting,
              formData
            );
          })
          .then(() => {
            setFbIsLoading(false);
            setOpenDetail(false);
            setIsEditing(false);
          });
      });
    } else {
      setMissingFormData(true);
      setFbIsLoading(false);
    }
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
                onChangeMeeting={changeMeetingHandler}
                updatedMeeting={updatedMeeting}
                updatedTime={updatedTime}
                setUpdatedTime={setUpdatedTime}
                setUpdatedGuests={setUpdatedGuests}
                setMissingFormData={setMissingFormData}
                updatedGuests={updatedGuests}
              />
            ) : (
              <DetailDom clickedMeeting={clickedMeeting} />
            )}

            <p className=" text-red-600 h-1 text-sm">
              {missingFormData &&
                "Please fill in name and time of the meeting."}
            </p>
          </ModalBody>
        )}

        <ModalFooter className="[&>button]:m-1 ">
          {/* Buttons se zobrazují, pokud se zrovna neloaduje (deleting a updating mtg) */}
          {/* Delete a Edit meeting buttons se zobrazí pouze, pokud daný user meeting vytvořil! */}
          {clickedMeeting.creator == user!.email &&
            !isEditing &&
            !fbIsLoading &&
            !isLoading && (
              <div className="flex [&>*]:ml-1">
                <Button
                  colorScheme="red"
                  onClick={deleteMeetingHandler}
                  leftIcon={<BsTrash size={20} />}
                >
                  Delete
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={editModeToggler}
                  leftIcon={<BsPencil size={20} />}
                >
                  Edit
                </Button>
              </div>
            )}
          {isEditing && !fbIsLoading && !isLoading && (
            <Button
              colorScheme="teal"
              onClick={submitUpdatedMeeting}
              type="submit"
            >
              Update meeting
            </Button>
          )}
          {!fbIsLoading && !isLoading && (
            <Button onClick={onCancel}>Back</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingDetail;
