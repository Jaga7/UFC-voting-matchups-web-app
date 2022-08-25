import { AuthState } from "../../types/AuthT";

export const initialAuthState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: "",
};
