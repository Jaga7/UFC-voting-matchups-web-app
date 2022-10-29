import { WeightclassEnumT } from "./WeightClassEnumT";

export type MatchupQueryT = {
  weightclass?: WeightclassEnumT | void | "all";
  oneFighterId?: string;
  otherFighterId?: string;
  getTopVoted?: boolean;
};
