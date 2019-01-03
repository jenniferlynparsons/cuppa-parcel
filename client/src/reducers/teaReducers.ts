import { Tea, Action } from "../interfaces";
import { Set, Map } from "immutable";

export default (state: Tea[] = [], action: Action): Tea[] => {
  switch (action.type) {
    case "ADD_TEA":
      // console.log("action.payload");
      // console.log(action.payload);
      return [...state, action.payload];
    case "DELETE_TEA":
      return state.filter(t => t.id !== action.payload.id);
    case "EDIT_TEA":
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    case "GET_TEAS":
      // I wasn't planning on using immutable but it solved my problem here really well
      return Set([...state, ...action.payload])
        .map(Map)
        .toJS();
  }
  return state;
};
