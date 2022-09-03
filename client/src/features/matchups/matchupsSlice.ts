import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMatchupsState as initialState } from "./initialState";
import { voteForMatchup } from "./matchupsAsyncActions";

export const matchupsSlice = createSlice({
  name: "matchups",
  initialState,
  reducers: {},
  extraReducers: {
    [voteForMatchup.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [voteForMatchup.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    [voteForMatchup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default matchupsSlice.reducer;
