import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMatchupsState as initialState } from "./initialState";
import { getAMatchup } from "./matchupsAsyncActions";

export const matchupsSlice = createSlice({
  name: "matchups",
  initialState,
  reducers: {},
  extraReducers: {
    [getAMatchup.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getAMatchup.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    [getAMatchup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default matchupsSlice.reducer;
