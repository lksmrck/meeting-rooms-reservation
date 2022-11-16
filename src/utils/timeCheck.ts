//Čekuje dobu, po kterou je user lognutý a po 0.5 hod odhlásí. 
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";


export const timeCheck = (setUser: any) => {


let hours = 0.5; 

let now = new Date().getTime();

var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", JSON.stringify(now));
} else {
  const parsedSetupTime = JSON.parse(setupTime);

  if (now - parsedSetupTime > hours * 60 * 60 * 1000) {
    localStorage.removeItem("setupTime");
    setUser(null)
    signOut(auth)
    .catch((error) => {
      console.log(error);
    });
    
  }
}
}
