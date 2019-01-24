import { Status } from "../interfaces/general-interfaces";

export const editTeaFlash = (status: Status) => ({
  type: "EDIT_TEA_FLASH",
  payload: status
});
