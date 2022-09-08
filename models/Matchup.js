import mongoose from "mongoose";
const { Schema } = mongoose;

const MatchupSchema = new Schema({
  matched_fighters: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Fighter",
      required: [true, "Please provide matched-up fighter"],
    },
  ],
  matched_fighters: { type: [mongoose.Types.ObjectId], length: 2 },
  ids_of_voters: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide voting user"],
    },
  ],
  weightclass: {
    type: String,
    enum: [
      "Flyweight",
      "Bantamweight",
      "Featherweight",
      "Lightweight",
      "Welterweight",
      "Middleweight",
      "LightHeavyweight",
      "Heavyweight",
      "womenStrawweight",
      "womenFlyweight",
      "womenBantamweight",
    ],
    required: [true, "Please provide weightclass"],
  },
});

export default mongoose.model("Matchup", MatchupSchema);
