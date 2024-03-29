import { TeaTypes } from "./tea-interfaces";
import { Auth, UserState, UserErrors } from "./auth-interfaces";

export type UserIdObj = object;

export type UserId = string;

export type UpdateFlash = (status: boolean) => void;

export type FlashStatus = boolean;

export interface Match {
  params: {
    id: string;
  };
}

export interface History {
  push: (path: string) => void;
}

export interface AppState {
  id: string;
  teas: [{ id: string }];
  teaTypes: TeaTypes;
  auth: Auth;
  errors: UserErrors;
  handleSubmit: (userData: UserState) => void;
  flash?: FlashStatus;
  history: History;
}
export interface AuthAction {
  type: string;
  payload: {
    id: string;
  };
}

export interface FlashAction {
  type: string;
  payload: boolean;
}

export interface History {
  push: (arg: string) => void;
}

export type Status = boolean;

export interface Response {
  data: string;
}

export interface APIResponse {
  token: string;
  json: () => Promise<any>;
  response: Response;
}

export interface FrontDecoded {
  exp: number;
}
