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

  matchups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Matchup", 
      //   required: [true, "Please provide matchups"],
    },
  ],
  //   image_url:
  //   matchups: [{ body: String, date: Date }],

  //   body: String,
  //   comments: [{ body: String, date: Date }],
  //   date: { type: Date, default: Date.now },
  //   hidden: Boolean,
  //   meta: {
  //     votes: Number,
  //     favs: Number,
  //   },
});

export default mongoose.model("Fighter", FighterSchema);
