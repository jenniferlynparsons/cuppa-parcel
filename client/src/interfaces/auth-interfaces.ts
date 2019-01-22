export type Decoded = object;

export type GetUser = () => void;

export interface User {
  name: string;
  email: string;
}

export interface Auth {
  isAuthenticated: boolean;
  user: User;
}

export interface History {
  push: (path: string) => void;
}

export interface UserProps {
  id: string;
  teas: [{ id: string }];
  auth: Auth;
  errors: UserErrors;
  history: History;
  handleSubmit: (userData: UserState) => void;
  logoutUser: () => void;
}

export interface UserErrors {
  name?: string;
  email: string;
  emailnotfound: string;
  password: string;
  password2?: string;
  passwordincorrect: string;
}

// TODO: this much optional stuff makes me wary
export interface UserState {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
  errors?: UserErrors;
}
