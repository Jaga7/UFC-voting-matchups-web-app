import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAuthState as initialState } from "./initialState";
import { loginUser, registerUser } from "./authAsyncActions";
import { RegisterOrLoginResponseT } from "../../types/AuthT";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [loginUser.fulfilled.type]: (
      state,
      action: PayloadAction<RegisterOrLoginResponseT>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<RegisterOrLoginResponseT>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
