import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../app/store";
import { MatchupCreatingT, MatchupT, VoteForMatchupT } from "../types/MatchupT";
import { MatchupQueryT } from "../types/MatchupQueryT";
import baseUrl from "../shared/baseUrl";

export const matchupsAPI = createApi({
  reducerPath: "matchupPath",
  baseQuery: fetchBaseQuery({
    baseUrl,
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
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }) => ({ type: "Matchups" as const, id: _id })),
        "Matchups",
      ],
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
      async onQueryStarted(
        { weightclass, ...newMatchup },
        { dispatch, queryFulfilled }
      ) {
        const postResult = dispatch(
          matchupsAPI.util.updateQueryData(
            "getMatchups",
            { weightclass },
            (draft: MatchupT[]) => {
              const tempId = Math.random().toString(36).substring(7);
              draft.push({
                matched_fighters: [...newMatchup.fightersIds],
                ids_of_voters: [newMatchup.voterId],
                votersAmount: 1,
                weightclass: weightclass,
                _id: tempId,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
    }),
    patchMatchup: build.mutation<MatchupT, VoteForMatchupT>({
      query: (options) => ({
        url: `/api/v1/matchups/${options.matchupId}`,
        method: "PATCH",
        body: {
          ...options,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Matchups", id: arg.matchupId },
      ],
      async onQueryStarted(
        { weightclass, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          matchupsAPI.util.updateQueryData(
            "getMatchups",
            { weightclass },
            (draft: MatchupT[]) => {
              const indexOfTheMatchupBeingUpdated = draft.findIndex(
                (matchup: MatchupT) => matchup._id === patch.matchupId
              );
              draft[indexOfTheMatchupBeingUpdated].ids_of_voters =
                patch.hasUserAlreadyVotedForThatMatchup
                  ? draft[indexOfTheMatchupBeingUpdated].ids_of_voters.filter(
                      (id) => id !== patch.voterId
                    )
                  : [
                      ...draft[indexOfTheMatchupBeingUpdated].ids_of_voters,
                      patch.voterId,
                    ];

              draft[indexOfTheMatchupBeingUpdated].votersAmount +=
                patch.hasUserAlreadyVotedForThatMatchup ? -1 : 1;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetMatchupsQuery,
  useAddMatchupMutation,
  usePatchMatchupMutation,
} = matchupsAPI;
