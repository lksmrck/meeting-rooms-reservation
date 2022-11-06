import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";


export const companyRoomsFetch = (company: string, setState: any ) => {
    let roomsList: any = [];
    const roomsFetch = async () => {
      const querySnapshot = await getDocs(
        collection(db, `companies/${company}/rooms`)
      );
      let counter = 1;

      //Vytvořím array of objects, kde roomData jsou default room data pro daný den. Ty se později upraví na základě toho, zda jsou některé bloky v daném dnu rezerované
      querySnapshot.forEach((doc) => {
        roomsList.push({ id: counter, name: doc.data().name /* , roomData */ });
        
        counter += 1;
      });
      counter = 1;

      setState(roomsList);
   
    
    };
    roomsFetch()

}