import { Tea } from "./../interfaces";

interface AddTea {
  type: "ADD_TEA";
  payload: Tea;
}

export const addTea = (tea: Tea): AddTea => ({ type: "ADD_TEA", payload: tea });

interface DeleteTea {
  type: "DELETE_TEA";
  payload: Tea;
}

export const deleteTea = (tea: Tea): DeleteTea => ({
  type: "DELETE_TEA",
  payload: tea
});

interface EditTea {
  type: "EDIT_TEA";
  payload: Tea;
}

export const editTea = (tea: Tea): EditTea => ({
  type: "EDIT_TEA",
  payload: tea
});
