import { WeighclassTypes } from "./FighterT";

export type FighterQuery = {
  weightclass: WeighclassTypes | void | "all";
};
