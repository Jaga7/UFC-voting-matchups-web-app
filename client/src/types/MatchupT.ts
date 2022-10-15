import { WeightclassEnumT } from "./WeightClassEnumT";

export type MatchupT = {
  _id: string;
  matched_fighters: [string, string]; // there are two fighters
  ids_of_voters: string[];
  weightclass: WeightclassEnumT;
};

// export type MatchupNewT = Omit<MatchupT, "_id">;

export type MatchupCreatingT = {
  fightersIds: [string, string];
  voterId: string;
  weightclass: WeightclassEnumT;
};

export type VoteForMatchupT = {
  matchupId: string;
  voterId: string;
  hasUserAlreadyVotedForThatMatchup: boolean;
};
