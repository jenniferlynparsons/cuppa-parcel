import { Tea, Action } from "../interfaces";

export default (state: Tea[] = [], action: Action): Tea[] => {
  switch (action.type) {
    case "ADD_TEA":
      // return new state with new array for all three actions
      return [...state, action.payload];
    case "DELETE_TEA":
      return state.filter(t => t.id !== action.payload.id);
    case "EDIT_TEA":
      // console.log(action.payload);
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
  }
  return state;
};
