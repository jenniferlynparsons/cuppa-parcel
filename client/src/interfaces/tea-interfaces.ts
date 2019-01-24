// import { RouteComponentProps } from "@reach/router";
import { GetUser } from "./auth-interfaces";
import { Match, UpdateFlash, UserId } from "./general-interfaces";

export interface TeaAction {
  type: string;
  payload: {
    id: string;
  };
}

export interface Tea {
  id: string;
  name?: string;
  brand?: string;
  teaType?: string;
  servings?: number;
  updated?: boolean;
  match: Match;
}

export type TeaTypes = string[];

export type Teas = Tea[];

export type HandleDelete = (tea: Tea) => void;
export interface TeaListProps {
  handleDelete: HandleDelete;
  getTeaList: (userID: UserId) => void;
  userID: UserId;
  teas: Teas;
  teaTypes: TeaTypes;
  getUser: GetUser;
}

export interface TeaDetailsProps {
  tea: Tea;
  flash?: string;
  handleDelete: (tea: Tea) => void;
  onClick: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    status: boolean
  ) => void;
  updateFlash: UpdateFlash;
}

export interface TeaEditorProps {
  name: string;
  servings: number;
  id: string;
  errors: [];
  userID: string;
  teas: Teas;
  teaTypes: TeaTypes;
  getUser: GetUser;
  handleSubmit: (tea: Tea) => void;
}

export interface TeaEditorState {
  teas: [];
  teaTypes: [];
}

export interface TeaProps {
  handleSubmit: (tea: Tea) => void;
  handleDelete: (tea: Tea) => void;
}

export interface TeaErrors {
  name: boolean;
  servings: boolean;
}
