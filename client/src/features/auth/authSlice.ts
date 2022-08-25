import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAuthState as initialState } from "./initialState";
import { loginUser, loginUserByToken, registerUser } from "./authAsyncActions";
import { UserT } from "../../types/UserT";
import { RegisterResponseT } from "../../types/AuthT";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<UserT>) => {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUserByToken.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [loginUserByToken.fulfilled.type]: (
      state,
      action: PayloadAction<UserT>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload;
    },
    [loginUserByToken.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<RegisterResponseT>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.currentUser = action.payload.user;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
