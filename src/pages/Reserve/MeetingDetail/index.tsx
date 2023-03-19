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
import {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  FC,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import useAuth from "../../../hooks/useAuth";
import ReservationContext from "../../../state/ReservationContext";
import { useRemoveMeeting } from "../../../hooks/useRemoveMeeting";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Meeting } from "../../../types/types";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import DetailDomEditMode from "./DetailDomEditMode";
import DetailDom from "../../../components/meetingDetail/DetailDom";
import { timeToBlocks } from "../../../utils/timeToBlocks";
import { useAddMeeting } from "../../../hooks/useAddMeeting";
import { updatePickedRoom } from "../../../utils/updatePickedRoom";
import { useMeetingsFetch } from "../../../hooks/useMeetingsFetch";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { paramsToDate } from "../../../utils/dateParamsFormat";

type MeetingDetailProps = {
  clickedMeeting: Meeting;
  openDetail: boolean;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
  setMeetingsDetail: Dispatch<SetStateAction<Meeting[]>>;
};

const MeetingDetail: FC<MeetingDetailProps> = ({
  clickedMeeting,
  openDetail,
  setOpenDetail,
  setMeetingsDetail,
}) => {
  //**** STATE ***
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(clickedMeeting);
  const [updatedTime, setUpdatedTime] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });
  const [updatedGuests, setUpdatedGuests] = useState(updatedMeeting.guests);
  const [missingFormData, setMissingFormData] = useState(false);

  const [fbIsLoading, setFbIsLoading] = useState(false);

  const { user } = useAuth();

  //**** CONTEXT ****
  const { pickedRoom, setPickedRoom } = useContext(ReservationContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const pickedRoomId = searchParams.get("room");
  const pickedDate = searchParams.get("date");

  const formatedDate = paramsToDate(pickedDate!);
  const navigate = useNavigate();

  //**** CUSTOM HOOKS ****
  const { fetchMeetings } = useMeetingsFetch();
  const { addMeeting } = useAddMeeting();
  const { removeData, isLoading } = useRemoveMeeting();

  //**** FUNCTIONS and HANDLERS ****
  const onCancel = (): void => {
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

  const deleteMeetingHandler = (e: SyntheticEvent): void => {
    setFbIsLoading(true);
    removeData(clickedMeeting, pickedRoomId as string).then(() => {
      navigate(`/overview?date=${pickedDate}`);
      setFbIsLoading(false);
      setOpenDetail(false);
    });
  };

  const editModeToggler = (): void => {
    setIsEditing(true);
  };

  const changeMeetingHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setUpdatedMeeting({ ...updatedMeeting, [e.target.name]: e.target.value });
    if (missingFormData) setMissingFormData(false);
  };

  const submitUpdatedMeeting = (e: SyntheticEvent): void => {
    e.preventDefault();
    setMissingFormData(false);
    setFbIsLoading(true);
    const blocks = timeToBlocks(updatedTime);
    if (!pickedRoomId) return;
    const formData: Meeting = {
      ...updatedMeeting,
      room: pickedRoomId,
      blocks,
      creator: user!.email,
      guests: updatedGuests,
    };

    if (
      updatedMeeting.name.length > 0 &&
      updatedTime.start != null &&
      updatedTime.end != null
    ) {
      removeData(clickedMeeting, pickedRoomId as string).then(() => {
        addMeeting(formData, pickedRoomId as string)
          .then(() => {
            fetchMeetings(
              formatedDate,
              setMeetingsDetail,
              pickedRoomId as string
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
    <Modal
      isOpen={openDetail}
      onClose={() => setOpenDetail(false)}
      motionPreset="slideInBottom"
    >
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
          {clickedMeeting.creator === user!.email &&
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
