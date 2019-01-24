import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const initialState = {};

const middleware = [apiMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export default store;
