import axios from "axios";
/* import { HoldingItem, Transaction } from "../common/modelTypes"; */

const API = axios.create({ baseURL: process.env.REACT_APP_API });

//Reservations
export const fetchReservations = (userId: string) =>
  API.get("/reservations", { params: { userId: userId } });

export const addReservation = (newHolding: any /* HoldingItem */) =>
  API.post("/reservations", newHolding);

export const updateReservation = (
  name: string,
  updatedHolding: any /* HoldingItem */
) => API.patch(`${"/holdings"}/${name}`, updatedHolding);

export const deleteReservations = (
  formData: Object //delete method
) => API.delete(`"/reservations"`, formData);

//Auth
export const registerUser = (userData: any) => API.post("/register", userData);

export const loginUser = (userData: any) => API.post("/login", userData);
