import { WeightclassEnumT } from "./WeightClassEnumT";

export type FighterT = {
  _id: string;
  fullname: string;
  weightclass: WeightclassEnumT;
  // matchups: { matchupId: number; opponentId: number }[];
};
