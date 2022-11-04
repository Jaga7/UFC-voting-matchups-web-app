import puppeteer from "puppeteer";
import { scrapeAllFighters } from "./scrapeAllRankedFighters.js";
import { scrapeFightersWhoHaveAMatchup } from "./scrapeFightersWhoHaveAMatchup.js";

import { getFightersWithoutAMatchupFromScrapedData } from "./mongoStuff/gettingFightersWithoutAMatchup.js";
import { handleNewlyScrapedData } from "./mongoStuff/handlingNewlyScrapedData.js";
import connectDB from "../db/connect.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const URL_UFC_RANKINGS = "https://www.ufc.com/rankings";
const URL_UFC_UPCOMING_EVENTS =
  "https://www.ufc.com/events#events-list-upcoming";

async function scrapeFighters() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const allRankedFighters = await scrapeAllFighters(URL_UFC_RANKINGS, page);
  const fightersWhoHaveAMatchup = await scrapeFightersWhoHaveAMatchup(
    URL_UFC_UPCOMING_EVENTS,
    page
  );

  browser.close();

  return { allRankedFighters, fightersWhoHaveAMatchup };
}

const scrapeAndSaveToDatabase = async () => {
  const { allRankedFighters, fightersWhoHaveAMatchup } = await scrapeFighters();
  await start();
  const fightersWithoutAMatchup =
    await getFightersWithoutAMatchupFromScrapedData(
      allRankedFighters,
      fightersWhoHaveAMatchup
    );
  await handleNewlyScrapedData(fightersWithoutAMatchup);
};

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

scrapeAndSaveToDatabase();
