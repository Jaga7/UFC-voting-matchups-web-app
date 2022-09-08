import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { MatchupNewT, MatchupT } from "../types/MatchupT";
import { MatchupQueryT } from "../types/MatchupQueryT";
import { FighterT } from "../types/FighterT";

export const matchupsAPI = createApi({
  reducerPath: "matchupPath",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Matchups"],
  endpoints: (build) => ({
    getMatchups: build.query<
      MatchupT[], // or null?
      MatchupQueryT | void
    >({
      query: (options) => ({
        url: "/api/v1/matchups",
        params: {
          weightclass: options?.weightclass,
        },
      }),

      providesTags: ["Matchups"],
    }),
    getAMatchup: build.query<
      MatchupT,
      {
        oneFighterName: FighterT["fullname"];
        otherFighterName: FighterT["fullname"];
      }
    >({
      query: (fightersNames) => ({
        url: `matchups`,
        body: { ...fightersNames },
      }),
      providesTags: ["Matchups"],
    }),
    addMatchup: build.mutation<MatchupT, MatchupNewT>({
      query: (matchup) => {
        return {
          url: "matchups",
          method: "POST",
          body: matchup,
        };
      },
      invalidatesTags: ["Matchups"],
    }),
    patchMatchup: build.mutation<MatchupT, { id: string; [key: string]: any }>({
      query: (options) => ({
        url: `matchups/${options.id}`,
        method: "PATCH",
        body: {
          ...options,
        },
      }),
      invalidatesTags: ["Matchups"],
    }),
  }),
});

export const {
  useGetMatchupsQuery,
  useGetAMatchupQuery,
  useAddMatchupMutation,
  usePatchMatchupMutation,
} = matchupsAPI;
