import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { MatchupCreatingT, MatchupT, VoteForMatchupT } from "../types/MatchupT";
import { MatchupQueryT } from "../types/MatchupQueryT";

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
    getMatchups: build.query<MatchupT[], MatchupQueryT>({
      query: (options) => ({
        url: "/api/v1/matchups",
        params: {
          weightclass: options?.weightclass,
          oneFighterId: options?.oneFighterId,
          otherFighterId: options?.otherFighterId,
          getTopVoted: options?.getTopVoted,
        },
      }),

      providesTags: ["Matchups"],
    }),
    addMatchup: build.mutation<MatchupT, MatchupCreatingT>({
      query: (matchup) => {
        return {
          url: "/api/v1/matchups",
          method: "POST",
          body: matchup,
        };
      },
      invalidatesTags: ["Matchups"],
    }),
    patchMatchup: build.mutation<MatchupT, VoteForMatchupT>({
      query: (options) => ({
        url: `/api/v1/matchups/${options.matchupId}`,
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
  useAddMatchupMutation,
  usePatchMatchupMutation,
} = matchupsAPI;
