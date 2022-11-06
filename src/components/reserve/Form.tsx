import React, { useState, useContext } from "react";
/* import Input from "../layout/Input"; */
import { Button } from "@chakra-ui/react";
import Select from "../layout/Select";
import { rooms } from "../../common/dummyData";
import AppContext from "../../state/AppContext";
import AuthContext from "../../state/AuthContext";
import { meetingTypes } from "../../constants/data";
import { Input } from "@chakra-ui/react";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const Form: React.FC = () => {
  const [fetchData, setFetchData] = useState();
  //FormData

  //1.meeting name
  const [name, setName] = useState<string>();
  //2.room

  //3.guests
  const [guests, setGuests] = useState<string[]>([]);

  //4.meeting type
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);
  if (!appContext) return null;
  //nepouzito zatim
  const { setOpenModal } = appContext;

  if (!authContext) return null;
  const { company } = authContext;

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    /*  try {
      const response = await addDoc(collection(db, "cities"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        timeStamp: serverTimestamp(), //čas přidání
      });
      console.log(response.id);
    } catch (error) {
      console.log(error);
    } */
  };

  const testFetch = async () => {
    const querySnapshot = await getDocs(
      collection(db, `companies/${company}/meetings`)
    );

    let list: any = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    /* setFetchData(list); */
    console.log(list);
  };

  return (
    <section className="flex justify-center mt-4 ">
      <div className=" flex justify-center  bg-green-50 h-1/3 rounded-lg items-center">
        <form className="flex flex-col w-72 p-6 [&>input]:m-1 ">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the meeting name"
            onChange={onChangeInputHandler}
            style={{ backgroundColor: "white" }}
          />
          {/* Select room */}
          <Select name="rooms" id="rooms" options={rooms} />
          {/* Button to open the modal with checkboxes to reserve time blocks */}
          <Button
            colorScheme={"purple"}
            //VYUZIT
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add guests
          </Button>

          <Select name="rooms" id="rooms" options={meetingTypes} />
          <div className="flex flex-col justify-center [&>button]:mt-1 ">
            <Button colorScheme="teal" type="submit">
              Reserve
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={testFetch}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
