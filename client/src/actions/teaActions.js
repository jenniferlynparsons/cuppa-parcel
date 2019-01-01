import { RSAA } from "redux-api-middleware";
import { Tea } from "./../interfaces";

const API_SERVER = "http://localhost:5000";

interface AddTea {
  type: "ADD_TEA";
  payload: Tea;
}

// export const addTea = (tea: Tea): AddTea => ({ type: "ADD_TEA", payload: tea });

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

// export const editTea = (tea: Tea): EditTea => ({
//   type: "EDIT_TEA",
//   payload: tea
// });

export function editTea(tea) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/update-tea`,
      method: "PUT",
      types: [
        "REQUEST",
        {
          type: "EDIT_TEA",
          payload: async (action, state, res) => {
            res = await res.json();
            console.log(JSON.stringify(res));

            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (action, state, res) => {
            res.response.data;
          }
        }
      ],
      body: JSON.stringify(tea),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Add Tea
export function addTea(tea) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/new-tea`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "ADD_TEA",
          payload: async (action, state, res) => {
            res = await res.json();
            console.log(JSON.stringify(res));

            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (action, state, res) => {
            res.response.data;
          }
        }
      ],
      body: JSON.stringify(tea),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Get Teas
export function getTeas() {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/teasList`,
      method: "GET",
      types: [
        "REQUEST",
        {
          type: "GET_TEAS",
          payload: async (action, state, res) => {
            res = await res.json();
            console.log(res);

            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (action, state, res) => {
            res.response.data;
          }
        }
      ],
      headers: { "Content-Type": "application/json" }
    }
  };
}
