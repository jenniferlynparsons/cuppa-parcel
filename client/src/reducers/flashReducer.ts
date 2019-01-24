import { FlashAction } from "../interfaces/general-interfaces";

export default (state = false, action: FlashAction) => {
  switch (action.type) {
    case "EDIT_TEA_FLASH":
      return (state = action.payload);
  }
  return state;
};
