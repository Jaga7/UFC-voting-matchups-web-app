import { AuthState } from "../../types/AuthT";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialAuthState: AuthState = {
  currentUser: user ? JSON.parse(user) : null,
  isLoading: false,
  error: "",
  token: token,
};
