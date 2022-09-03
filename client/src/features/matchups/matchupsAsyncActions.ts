import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { MatchupT } from "../../types/MatchupT";

import { RegisterOrLoginResponseT } from "../../types/AuthT";
import { RootState } from "../../app/store";

// const matchupFetch = axios.create({
//   baseURL: "/api/v1",
// });

// matchupFetch.interceptors.request.use(
//   (config) => {
//     config.headers.common["Authorization"] = `Bearer ${state.token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const voteForMatchup = createAsyncThunk(
  "matchups/voteForMatchup",
  async (
    fightersIdsAndVoterId: {
      fightersIds: { oneFighterId: string; otherFighterId: string };
      voterId: string;
    },
    thunkAPI
  ) => {
    const token = (thunkAPI.getState() as RootState).authReducer.token;
    const authHeader: { Authorization: string } = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `/api/v1/matchups?oneFighterId=${fightersIdsAndVoterId.fightersIds.oneFighterId}&otherFighterId=${fightersIdsAndVoterId.fightersIds.otherFighterId}`,
        { headers: authHeader }
      );
      if (response.data !== null) {
        const responseFromPatch = await axios.patch(
          `/api/v1/matchups/${response.data.matchup._id}`,
          fightersIdsAndVoterId,
          { headers: authHeader }
        );
        return responseFromPatch.data;
      } else {
        const responseFromPost = await axios.post(
          `/api/v1/matchups`,
          fightersIdsAndVoterId,
          { headers: authHeader }
        );
        return responseFromPost.data;
      }
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("Unknown error");
      }
    }
  }
);
