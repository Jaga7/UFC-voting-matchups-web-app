import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MatchupNewT, MatchupT } from "../types/MatchupT";
import { FighterT } from "../types/FighterT";

export const matchupsAPI = createApi({
  reducerPath: "matchupPath",
  baseQuery: fetchBaseQuery({}),
  tagTypes: ["Matchups"],
  endpoints: (build) => ({
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
  useGetAMatchupQuery,
  useAddMatchupMutation,
  usePatchMatchupMutation,
} = matchupsAPI;
