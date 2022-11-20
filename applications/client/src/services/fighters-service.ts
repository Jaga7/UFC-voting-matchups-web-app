import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../app/store";
import { EntityPage } from "../types/EntityPage";
import { FighterQueryT } from "../types/FighterQueryT";
import { FighterQueryResponseT } from "../types/FighterQueryResponseT";
import { FighterT } from "../types/FighterT";
import baseUrl from "../shared/baseUrl";

export const fightersAPI = createApi({
  reducerPath: "fighterPath",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Fighters", "FightersFromTopMatchups"],
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
    getFightersByIds: build.query<{ response: FighterT[] }, string[]>({
      query: (ids) => ({
        url: `/api/v1/fighters?${ids.reduce(
          (acc, curr) => (acc += `id=${curr}&`),
          ""
        )}`,
      }),
      transformResponse(response: FighterQueryResponseT, meta) {
        return {
          response: response.fighters,
        };
      },
      providesTags: ["FightersFromTopMatchups"],
    }),
  }),
});

export const { useGetFightersQuery, useGetFightersByIdsQuery } = fightersAPI;
