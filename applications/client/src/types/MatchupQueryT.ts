import { WeightclassEnumT } from "./WeightClassEnumT";

export type MatchupQueryT = {
  weightclass?: WeightclassEnumT | "all";
  getTopVoted?: boolean;
};
