import {
  FETCH_ALL_RESERVATIONS,
  ADD_RESERVATION,
  UPDATE_RESERVATION,
  DELETE_RESERVATION,
  SET_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "../../constants/actionTypes";

import { ErrorLoadingActions } from "../../common/actionTypes";

import { Dispatch } from "react"; //import z Redux Toolkig ??

import * as api from "../../api/index";

export const getReservations =
  (userId: string) =>
  async (
    dispatch: Dispatch</* HoldingsTransactionsActions */ ErrorLoadingActions>
  ) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchReservations(userId); //const response = await fetch(...)
      dispatch({ type: FETCH_ALL_RESERVATIONS, payload: data });
      if (data) {
        setTimeout(() => {
          dispatch({ type: STOP_LOADING });
        }, 100);
      }
    } catch (error: any) {
      dispatch({ type: STOP_LOADING });
      const errMsg =
        error.response && error.response.data?.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SET_ERROR, payload: errMsg });
    }
  };
