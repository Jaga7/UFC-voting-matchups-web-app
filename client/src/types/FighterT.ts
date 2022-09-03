export type WeighclassTypes =
  | "Flyweight"
  | "Bantamweight"
  | "Featherweight"
  | "Lightweight"
  | "Welterweight"
  | "Middleweight"
  | "LightHeavyweight"
  | "Heavyweight"
  | "womenStrawweight"
  | "womenFlyweight"
  | "womenBantamweight";

export type FighterT = {
  _id: string;
  fullname: string;
  weightclass: WeighclassTypes;
  // matchups: { matchupId: number; opponentId: number }[];
};
