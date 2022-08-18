// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import Fighter from "./models/Fighter.js";
// import Matchup from "./models/Matchup.js";

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

let allFightersWithoutAMatchup;
try {
  allFightersWithoutAMatchup = readFileSync(
    "../scrapedData/allFightersWithoutAMatchup.json",
    "utf8"
  );
  allFightersWithoutAMatchup = JSON.parse(
    allFightersWithoutAMatchup.toString()
  );
} catch (err) {
  console.error(err);
}
console.log("allFightersWithoutAMatchup", allFightersWithoutAMatchup);

// const createMatchupsForAWeightclass = async (weightclass) => {
//   const fightersOfTheWeightclass = await Fighter.find({
//     weightclass: weightclass,
//   });
//   console.log(
//     `fightersOfTheWeightclass:${weightclass}`,
//     fightersOfTheWeightclass
//   );
//   // count?
//   // for
// };

// await Fighter.deleteMany({}); // bruh

const createFightersForWeightclass = async (weightclass) => {
  for (const fighter of allFightersWithoutAMatchup[weightclass]) {
    await Fighter.create({ fullname: fighter, weightclass: weightclass });
  }
};
// const createMatchupsForWeightclass = async (fightersOfTheWeightclass) => {
//   for (const fighter of fightersOfTheWeightclass) {
//     // tutaj trzeba będzie zrobić tą pętlę, że 1-szy 14, 2-gi 13, 3-ci 12 itd., może Matchup.create zwraca stworzony Matchup, colt pokazywał że push się robi
//     const createdMatchup = await Matchup.create({
//       fullname: fighter,
//       weightclass: weightclass,
//     });
//   }
// }; NOPE!!!
for (const weightclass of Object.keys(allFightersWithoutAMatchup)) {
  await createFightersForWeightclass(weightclass);

  // const fightersOfTheWeightclass = await Fighter.find({
  //   weightclass: weightclass,
  // });
  // console.log(fightersOfTheWeightclass);

  // await createMatchupsForWeightclass(fightersOfTheWeightclass);

  console.log(weightclass);
}
