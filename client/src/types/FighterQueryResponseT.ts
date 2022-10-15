import { FighterT } from "./FighterT";

export type FighterQueryResponseT = {
  fighters: FighterT[];
  totalFighters: number;
  numOfPages: number;
};
