import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const ErrorCatcher: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toast(action.error.message);
    }
    return next(action);
  };
