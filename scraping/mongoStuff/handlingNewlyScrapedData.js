// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import Fighter from "../../models/Fighter.js";
import Matchup from "../../models/Matchup.js";

mongoose
  .connect("mongodb://localhost:27017/UFC_APP_TESTING")
  // .connect("mongodb://localhost:27017/UFC_APP")
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

let scrapedFightersWithoutAMatchup;
try {
  scrapedFightersWithoutAMatchup = readFileSync(
    "../scrapedData/scrapedFightersWithoutAMatchup.json",
    "utf8"
  );
  scrapedFightersWithoutAMatchup = JSON.parse(
    scrapedFightersWithoutAMatchup.toString()
  );
} catch (err) {
  console.error(err);
}

const scrapedFightersNames = [];
for (const weightclass of Object.keys(scrapedFightersWithoutAMatchup)) {
  for (const fighterName of scrapedFightersWithoutAMatchup[weightclass]) {
    scrapedFightersNames.push(fighterName);
  }
}
let toBeDeletedFightersObjectIds = await Fighter.find({
  fullname: { $not: { $in: scrapedFightersNames } },
}).distinct("_id");

await Fighter.deleteMany({
  _id: {
    $in: toBeDeletedFightersObjectIds,
  },
});

await Matchup.deleteMany({
  matched_fighters: { $in: toBeDeletedFightersObjectIds },
});

const createFightersForWeightclass = async (weightclass) => {
  for (const fighter of scrapedFightersWithoutAMatchup[weightclass]) {
    await Fighter.findOneAndUpdate(
      { fullname: fighter },
      { $setOnInsert: { fullname: fighter, weightclass: weightclass } },
      { upsert: true }
    );
  }
};

for (const weightclass of Object.keys(scrapedFightersWithoutAMatchup)) {
  await createFightersForWeightclass(weightclass);
}

// const hollyHolm = await Fighter.findOne({ fullname: "Holly Holm" });
// // hollyHolm.id;
// console.log("udało się Holly Holm", hollyHolm);

// const ireneAldana = await Fighter.findOne({ fullname: "Irene Aldana" });
// // ireneAldana.id;

// const createdMatchupHolmAldana = await Matchup.create({
//   matched_fighters: [hollyHolm.id, ireneAldana.id],
//   ids_of_voters: [20, 32],
// });

// await Fighter.findOneAndUpdate(
//   { _id: hollyHolm.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupHolmAldana.id, opponentId: ireneAldana.id },
//       ],
//     },
//   }
// );

// await Fighter.findOneAndUpdate(
//   { _id: ireneAldana.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupHolmAldana.id, opponentId: hollyHolm.id },
//       ],
//     },
//   }
// );

// ////

// // const hollyHolm = await Fighter.findOne({ fullname: "Holly Holm" });
// // hollyHolm.id;

// const karolRosa = await Fighter.findOne({ fullname: "Karol Rosa" });
// karolRosa.id;

// const createdMatchupHolmRosa = await Matchup.create({
//   matched_fighters: [hollyHolm.id, karolRosa.id],
//   ids_of_voters: [10, 53],
// });

// await Fighter.findOneAndUpdate(
//   { _id: hollyHolm.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupHolmRosa.id, opponentId: karolRosa.id },
//       ],
//     },
//   }
// );

// await Fighter.findOneAndUpdate(
//   { _id: karolRosa.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupHolmRosa.id, opponentId: hollyHolm.id },
//       ],
//     },
//   }
// );

// //////////

// const createdMatchupAldanaRosa = await Matchup.create({
//   matched_fighters: [ireneAldana.id, karolRosa.id],
//   ids_of_voters: [10, 53],
// });

// await Fighter.findOneAndUpdate(
//   { _id: ireneAldana.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupAldanaRosa.id, opponentId: karolRosa.id },
//       ],
//     },
//   }
// );

// await Fighter.findOneAndUpdate(
//   { _id: karolRosa.id },
//   {
//     $push: {
//       matchups: [
//         { matchupId: createdMatchupAldanaRosa.id, opponentId: ireneAldana.id },
//       ],
//     },
//   }
// );

console.log("udało się wszystko");
