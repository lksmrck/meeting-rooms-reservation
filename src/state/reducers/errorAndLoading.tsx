import { ErrorLoadingActions } from "../../common/actionTypes";
import {
  CLEAR_ERROR,
  SET_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "../../constants/actionTypes";

const errorState = { isError: false, errorMessage: "", loading: false };

export default (state = errorState, action: ErrorLoadingActions) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, isError: true, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, isError: false, errorMessage: null };
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
