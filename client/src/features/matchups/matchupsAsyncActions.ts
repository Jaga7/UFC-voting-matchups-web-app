import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { MatchupT } from "../../types/MatchupT";

import { RegisterOrLoginResponseT } from "../../types/AuthT";
import { RootState } from "../../app/store";
import { WeightclassEnumT } from "../../types/WeightClassEnumT";

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
    fightersIdsAndVoterIdAndWeightclass: {
      fightersIds: { oneFighterId: string; otherFighterId: string };
      voterId: string;
      weightclass: WeightclassEnumT;
    },
    thunkAPI
  ) => {
    const token = (thunkAPI.getState() as RootState).authReducer.token;
    const authHeader: { Authorization: string } = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `/api/v1/matchups?oneFighterId=${fightersIdsAndVoterIdAndWeightclass.fightersIds.oneFighterId}&otherFighterId=${fightersIdsAndVoterIdAndWeightclass.fightersIds.otherFighterId}`,
        { headers: authHeader }
      );
      if (response.data !== null) {
        const responseFromPatch = await axios.patch(
          `/api/v1/matchups/${response.data.matchup._id}`,
          fightersIdsAndVoterIdAndWeightclass,
          { headers: authHeader }
        );
        return responseFromPatch.data;
      } else {
        const responseFromPost = await axios.post(
          `/api/v1/matchups`,
          fightersIdsAndVoterIdAndWeightclass,
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
