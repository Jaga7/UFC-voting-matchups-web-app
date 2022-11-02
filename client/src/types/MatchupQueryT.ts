import { WeightclassEnumT } from "./WeightClassEnumT";

export type MatchupQueryT = {
  weightclass?: WeightclassEnumT | "all";
  oneFighterId?: string;
  otherFighterId?: string;
  getTopVoted?: boolean;
};
