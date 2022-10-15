import { UserT } from "./UserT";

export type AuthT = {
  password: string;
  email: string;
};

export interface AuthState {
  currentUser: UserT | null;
  isLoading: boolean;
  error: string;
  token: string | null;
}

export type RegisterOrLoginResponseT = {
  user: UserT;
  token: string;
};
