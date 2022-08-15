import { readFileSync } from "node:fs";

let allFightersWithoutAMatchup;
try {
  allRankedFighters = readFileSync(
    "scrapedData/allFightersWithoutAMatchup.json",
    "utf8"
  );
  allFightersWithoutAMatchup = JSON.parse(
    allFightersWithoutAMatchup.toString()
  );
} catch (err) {
  console.error(err);
}
console.log("allFightersWithoutAMatchup", allFightersWithoutAMatchup);
