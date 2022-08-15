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
  //   matched_fighters: {type:[mongoose.Types.ObjectId],length:2},
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide voting user"],
    },
  ],
});

export default mongoose.model("Matchup", MatchupSchema);
