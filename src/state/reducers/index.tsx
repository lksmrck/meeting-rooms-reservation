import { combineReducers } from "redux";
import reservations from "./reservations";
import errorAndLoading from "./errorAndLoading";

/* import holdings from "./holdings";
import transactions from "./transactions";
import auth from "./auth";
import errorAndLoading from "./errorAndLoading"; */

export const reducers = combineReducers({
  errorAndLoading,
  reservations,
});
