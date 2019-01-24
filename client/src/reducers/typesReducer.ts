import { TeaTypes } from "../interfaces/tea-interfaces";

export default (
  state: TeaTypes = ["Black", "Green", "White", "Herbal"]
): TeaTypes => {
  return state;
};
