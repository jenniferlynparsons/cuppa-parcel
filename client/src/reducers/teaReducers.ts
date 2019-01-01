import { Tea, Action } from "../interfaces";

export default (state: Tea[] = [], action: Action): Tea[] => {
  switch (action.type) {
    case "ADD_TEA":
      console.log("action.payload");
      console.log(action.payload);
      return [...state, action.payload];
    case "DELETE_TEA":
      return state.filter(t => t.id !== action.payload.id);
    case "EDIT_TEA":
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    case "GET_TEAS":
      return [...state, ...action.payload];
  }
  return state;
};
