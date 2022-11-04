import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//  Handle auth tokens through middleware

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === "auth/loginUser/fulfilled") {
    toast.success("You have been logged in!");
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  } else if (action.type === "auth/loginUser/rejected") {
    toast.error(action.payload);
  } else if (action.type === "auth/logoutUser") {
    toast.info("You have been logged out.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else if (action.type === "auth/loginUserByToken/rejected") {
    toast.error(action.payload); // shows twice in strict mode, won't in production
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else if (action.type === "auth/registerUser/fulfilled") {
    toast.success("You have been registered!");
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  } else if (action.type === "auth/registerUser/rejected") {
    toast.error(action.payload);
  }
  return next(action);
};
