import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../features/auth/authAsyncActions";
import { logoutUser } from "../../features/auth/authSlice";

//  Handle auth tokens through middleware

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === loginUser.fulfilled.type) {
    toast.success("You have been logged in!");
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  } else if (action.type === loginUser.fulfilled.type) {
    toast.error(action.payload);
  } else if (action.type === logoutUser.type) {
    toast.info("You have been logged out.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else if (action.type === registerUser.fulfilled.type) {
    toast.success("You have been registered!");
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  } else if (action.type === registerUser.rejected.type) {
    toast.error(action.payload);
  }
  return next(action);
};
