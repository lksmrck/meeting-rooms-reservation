import axios from "axios";
/* import { HoldingItem, Transaction } from "../common/modelTypes"; */

const API = axios.create({ baseURL: process.env.REACT_APP_API });

const REGISTER_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

const LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

//Reservations
export const fetchReservations = (userId: string) =>
  API.get("/reservations", { params: { userId: userId } });

export const addReservation = (newReservation: any /* HoldingItem */) =>
  API.post("/reservations", newReservation);

export const updateReservation = (
  id: string,
  updatedReservation: any /* HoldingItem */
) => API.patch(`${"/holdings"}/${id}`, updatedReservation);

export const deleteReservations = (
  formData: Object //delete method
) => API.delete(`"/reservations"`, formData);

//Auth
export const registerUser = (userData: any) =>
  axios.post(REGISTER_ENDPOINT, userData);

export const loginUser = (userData: any) =>
  axios.post(LOGIN_ENDPOINT, userData);
