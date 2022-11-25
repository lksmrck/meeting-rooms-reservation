import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { timeDataCalc } from "./timeDataCalc";
import AuthContext from "../../state/AuthContext";
import ReservationContext from "../../state/ReservationContext";
import { useRemoveMeeting } from "../../hooks/use-removeMeeting";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import UpdateMeetingTime from "./UpdateMeetingTime";
import MeetingType from "../reserve/form/MeetingType";
import { meetingTypes } from "../../constants/constants";
import GuestsModal from "../reserve/form/GuestsModal";
import DisplayedGuests from "../reserve/form/DisplayedGuests";
import DetailDomEditMode from "./DetailDomEditMode";
import DetailDom from "./DetailDom";

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
  const [timeDetail, setTimeDetail] = useState(timeDataCalc(clickedMeeting));

  //Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(clickedMeeting);
  const [updatedTime, setUpdatedTime] = useState({ start: "", end: "" });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [updatedGuests, setUpdatedGuests] = useState([] as string[]);

  //State na local loading - aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated)
  const [fbIsLoading, setFbIsLoading] = useState(false);

  const { company, user } = useContext(AuthContext);
  const { pickedDate, pickedRoom } = useContext(ReservationContext);

  const { blocks } = clickedMeeting;

  const { removeData, isLoading } = useRemoveMeeting();

  const navigate = useNavigate();

  const onCancel = () => {
    isEditing ? setIsEditing(false) : setOpenDetail(false);
  };

  const deleteMeetingHandler = (e: React.SyntheticEvent) => {
    setFbIsLoading(true);
    removeData("secondCompany", clickedMeeting, pickedRoom.id);
    //Timeout aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated) - byly problémy s načítáním dat po odstranění mtg.
    setTimeout(() => {
      navigate("/overview");
      setFbIsLoading(false);
      setOpenDetail(false);
    }, 750);
  };

  const editModeToggler = () => {
    setIsEditing(true);
  };

  const onChangeMeeting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMeeting({ ...updatedMeeting, [e.target.name]: e.target.value });
    console.log(updatedMeeting);
  };

  const updateMeetingHandler = (e: any) => {
    e.preventDefault();
    console.log(updatedMeeting);
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
              onClick={updateMeetingHandler}
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
