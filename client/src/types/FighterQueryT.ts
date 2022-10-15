import { WeightclassEnumT } from "./WeightClassEnumT";

export type FighterQueryT = {
  weightclass: WeightclassEnumT | void | "all";
};
