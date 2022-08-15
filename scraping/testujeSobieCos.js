import { readFileSync, writeFile } from "node:fs";

let allRankedFighters;
try {
  allRankedFighters = readFileSync(
    "scrapedData/allRankedFighters.json",
    "utf8"
  );
  allRankedFighters = JSON.parse(allRankedFighters.toString());
} catch (err) {
  console.error(err);
}

let fightersWhoHaveAMatchup;
try {
  fightersWhoHaveAMatchup = readFileSync(
    "scrapedData/fightersWhoHaveAMatchup.json",
    "utf8"
  );
  fightersWhoHaveAMatchup = JSON.parse(fightersWhoHaveAMatchup.toString());
} catch (err) {
  console.error(err);
}

// TUTAJ TWORZĘ TO CO MNIE INTERESUJE
// console.log("fightersWhoHaveAMatchup", fightersWhoHaveAMatchup);
const allFightersWithoutAMatchup = {};
for (const weightclass of Object.keys(allRankedFighters)) {
  //   console.log(`${weightclass}:`);
  //   console.log(
  //     "fightersWhoHaveAMatchup[weightclass]",
  //     fightersWhoHaveAMatchup[weightclass]
  //   );
  //   console.log("allRankedFighters[weightclass]", allRankedFighters[weightclass]);
  if (fightersWhoHaveAMatchup[weightclass]) {
    allFightersWithoutAMatchup[weightclass] = allRankedFighters[
      weightclass
    ].filter((fighter) => {
      //   console.log("fighter", fighter);
      return !fightersWhoHaveAMatchup[weightclass].includes(fighter);
    });
  } else {
    allFightersWithoutAMatchup[weightclass] = allRankedFighters[weightclass];
    // allFightersWithoutAMatchup[weightclass] = ["s"];
  }
}

console.log("allFightersWithoutAMatchup", allFightersWithoutAMatchup);

writeFile(
  "scrapedData/allFightersWithoutAMatchup.json",
  JSON.stringify(allFightersWithoutAMatchup),
  (error) => {
    if (error) throw error;
  }
);
