import { AuthAction } from "../interfaces/general-interfaces";

const initialState = {};

export default function(state = initialState, action: AuthAction) {
  switch (action.type) {
    case "GET_ERRORS":
      return action.payload;
    default:
      return state;
  }
}
