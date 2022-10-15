import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

import { EntityPage } from "../types/EntityPage";
import { FighterQueryT } from "../types/FighterQueryT";
import { FighterQueryResponseT } from "../types/FighterQueryResponseT";

import { FighterT } from "../types/FighterT";

export const fightersAPI = createApi({
  reducerPath: "fighterPath",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Fighters"],
  endpoints: (build) => ({
    getFighters: build.query<
      { response: FighterQueryResponseT },
      (EntityPage & FighterQueryT) | void
    >({
      query: (options) => ({
        url: "/api/v1/fighters",
        params: {
          _limit: options?.amount,
          weightclass: options?.weightclass,
        },
      }),
      transformResponse(response: FighterQueryResponseT, meta) {
        return {
          response,
        };
      },

      providesTags: ["Fighters"],
    }),
  }),
});

export const { useGetFightersQuery } = fightersAPI;