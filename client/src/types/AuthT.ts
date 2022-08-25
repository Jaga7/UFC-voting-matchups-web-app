import { UserT } from "./UserT";

export type AuthT = {
  password: string;
  email: string;
};

export interface AuthState {
  currentUser: UserT | null;
  isLoading: boolean;
  error: string;
}

export type RegisterResponseT = {
  user: UserT;
  token: string;
};
