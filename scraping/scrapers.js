import puppeteer from "puppeteer";
import { scrapeAllFighters } from "./scrapeAllRankedFighters.js";
import { scrapeFightersWhoHaveAMatchup } from "./scrapeFightersWhoHaveAMatchup.js";

const URL_UFC_RANKINGS = "https://www.ufc.com/rankings";
const URL_UFC_UPCOMING_EVENTS =
  "https://www.ufc.com/events#events-list-upcoming";

async function scrapeFighters() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // await scrapeAllFighters(URL_UFC_RANKINGS, page)
  await scrapeFightersWhoHaveAMatchup(URL_UFC_UPCOMING_EVENTS, page);

  browser.close();
}

scrapeFighters();
