import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import colorThemeReducer from "../features/colorTheme/colorThemeSlice";
import matchupsReducer from "../features/matchups/matchupsSlice";
import { ErrorCatcher } from "../services/middleware/error";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { authMiddleware } from "./middleware/authMiddleware";
import { fightersAPI } from "../services/fighters-service";
import { matchupsAPI } from "../services/matchups-service";

const rootReducer = combineReducers({
  authReducer,
  colorThemeReducer,
  matchupsReducer,
  [fightersAPI.reducerPath]: fightersAPI.reducer,
  [matchupsAPI.reducerPath]: matchupsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        ErrorCatcher,
        fightersAPI.middleware,
        matchupsAPI.middleware,
        authMiddleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
