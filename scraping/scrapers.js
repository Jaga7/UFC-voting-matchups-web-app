import puppeteer from "puppeteer";
import { scrapeAllFighters } from "./scrapeAllRankedFighters.js";
import { scrapeFightersWhoHaveAMatchup } from "./scrapeFightersWhoHaveAMatchup.js";

import { writeFile } from "node:fs";

const URL_UFC_RANKINGS = "https://www.ufc.com/rankings";
const URL_UFC_UPCOMING_EVENTS =
  "https://www.ufc.com/events#events-list-upcoming";

async function scrapeFighters() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // const allRankedFighters = await scrapeAllFighters(URL_UFC_RANKINGS, page);
  // const fightersWhoHaveAMatchup = await scrapeFightersWhoHaveAMatchup(
  //   URL_UFC_UPCOMING_EVENTS,
  //   page
  // );

  // writeFile(
  //   "scrapedData/allRankedFighters.json",
  //   JSON.stringify(allRankedFighters),
  //   (error) => {
  //     if (error) throw error;
  //   }
  // );

  // writeFile(
  //   "scrapedData/fightersWhoHaveAMatchup.json",
  //   JSON.stringify(fightersWhoHaveAMatchup),
  //   (error) => {
  //     if (error) throw error;
  //   }
  // );
  browser.close();
}

scrapeFighters();
