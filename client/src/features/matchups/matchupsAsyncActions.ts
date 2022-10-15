import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { MatchupT } from "../../types/MatchupT";

import { RegisterOrLoginResponseT } from "../../types/AuthT";
import { RootState } from "../../app/store";
import { WeightclassEnumT } from "../../types/WeightClassEnumT";

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
        `/api/v1/matchups?oneFighterId=${fightersIds.oneFighterId}&otherFighterId=${fightersIds.otherFighterId}`,
        { headers: authHeader }
      );
      if (response.data === null) {
        return null;
      }
      console.log("RESPOSNSE", response.data);
      return response;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);
