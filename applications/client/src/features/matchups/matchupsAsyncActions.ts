import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { RootState } from "../../app/store";
import baseUrl from "../../shared/baseUrl";

export const getAMatchup = createAsyncThunk(
  "matchups/getMatchup",
  async (
    fightersIds: { oneFighterId: string; otherFighterId: string },
    thunkAPI
  ) => {
    const token = (thunkAPI.getState() as RootState).authReducer.token;
    const authHeader: { Authorization: string } = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/matchups?oneFighterId=${fightersIds.oneFighterId}&otherFighterId=${fightersIds.otherFighterId}`,
        { headers: authHeader }
      );
      if (response.data === null) {
        return null;
      }
      return response.data;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);
