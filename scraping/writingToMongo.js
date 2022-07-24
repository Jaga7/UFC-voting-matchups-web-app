import { readFile } from "node:fs";

readFile("scrapedData/allRankedFighters.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  // parse JSON object
  const allRankedFighters = JSON.parse(data.toString());

  // print JSON object
  console.log(allRankedFighters);
});

readFile("scrapedData/fightersWhoHaveAMatchup.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  // parse JSON object
  const fightersWhoHaveAMatchup = JSON.parse(data.toString());

  // print JSON object
  console.log(fightersWhoHaveAMatchup);
});
