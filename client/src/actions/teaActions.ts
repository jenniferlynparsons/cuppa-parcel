import { RSAA } from "redux-api-middleware";
import { Tea } from "../interfaces/tea-interfaces";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}`;

// Add Tea
export function addTea(tea: Tea) {
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

export function editTea(tea: Tea) {
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

export function deleteTea(tea: Tea) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/delete-tea`,
      method: "DELETE",
      types: [
        "REQUEST",
        {
          type: "DELETE_TEA",
          payload: async (action, state, res) => {
            res = await res.json();
            // console.log(JSON.stringify(res));

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
export function getTeas(userID) {
  console.log(userID);
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/teasList`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "GET_TEAS",
          payload: async (action, state, res) => {
            res = await res.json();
            // console.log(res);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userID)
    }
  };
}
