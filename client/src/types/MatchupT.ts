export type MatchupT = {
  _id: string;
  matched_fighters: [string, string]; // there are two fighters
  ids_of_voters: string[];
};

export type MatchupNewT = Omit<MatchupT, "_id">;
