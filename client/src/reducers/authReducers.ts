import { AuthAction } from "../interfaces/general-interfaces";

import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action: AuthAction) {
  switch (action.type) {
    case "SUCCESS":
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "USER_LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_CURRENT_USER":
      // console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
