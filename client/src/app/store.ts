import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import colorThemeReducer from "../features/colorTheme/colorThemeSlice";
import { ErrorCatcher } from "../services/middleware/error";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { authMiddleware } from "./middleware/authMiddleware";
import { fightersAPI } from "../services/fighters-service";

const rootReducer = combineReducers({
  authReducer,
  colorThemeReducer,
  [fightersAPI.reducerPath]: fightersAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        ErrorCatcher,
        fightersAPI.middleware,
        authMiddleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
