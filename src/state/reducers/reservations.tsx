import {
  FETCH_ALL_RESERVATIONS,
  ADD_RESERVATION,
  UPDATE_RESERVATION,
  DELETE_RESERVATION,
} from "../../constants/actionTypes";
/*   import { HoldingItem } from "../../common/modelTypes";
  import { HoldingsTransactionsActions } from "../../common/actionTypes"; */

export default (rooms = [], action: any /* HoldingsTransactionsActions */) => {
  switch (action.type) {
    case FETCH_ALL_RESERVATIONS:
      return action.payload;
    case ADD_RESERVATION:
      return [...rooms, action.payload];
    case UPDATE_RESERVATION:
      return; /* holdings.map((holding: HoldingItem) =>
          holding.name === action.payload.name ? action.payload : holding
        ); */
    case DELETE_RESERVATION:
      rooms = rooms.filter((holding: any /* HoldingItem */) => {
        return holding.name !== action.payload.itemName;
      });
      return rooms;

    default:
      return rooms;
  }
};
