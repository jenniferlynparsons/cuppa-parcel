// import { RouteComponentProps } from "@reach/router";

export interface Tea {
  id: string;
  name: string;
  brand: string;
  teaType: string;
  servings: number;
  updated: boolean;
}

export type TeaTypes = string[];

export type Teas = Tea[];

export interface TeaListProps {
  handleDelete: (tea: Tea) => void;
}

export interface TeaDetailsProps {
  tea: Tea;
  handleDelete: (tea: Tea) => void;
}

export interface TeaEditorProps {
  name: string;
  servings: number;
  id: string;
  teas: [];
  errors: [];
  handleSubmit: (tea: Tea) => void;
}

export interface TeaEditorState {
  teas: [];
  teaTypes: [];
}

export interface Props extends RouteComponentProps {
  handleSubmit: (tea: Tea) => void;
  handleDelete: (tea: Tea) => void;
}

export interface AppState {
  id: string;
  teas: [{ id: string }];
}

export interface Action {
  type: string;
  payload: object;
}

export interface Errors {
  name: boolean;
  servings: boolean;
}
