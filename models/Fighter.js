import mongoose from "mongoose";

const { Schema } = mongoose;

const FighterSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Please provide fullname"],
    minlength: 3,
    maxlength: 50,
  },
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

  // image_url
  // rank_or_champion
});

export default mongoose.model("Fighter", FighterSchema);
