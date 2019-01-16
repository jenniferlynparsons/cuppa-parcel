export interface AppState {
  id: string;
  teas: [{ id: string }];
  auth: {};
}
export interface Action {
  type: string;
  payload: object;
}
