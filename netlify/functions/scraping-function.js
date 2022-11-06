import { schedule } from "@netlify/functions";
import { scrapeAndSaveToDatabase } from "../../applications/backend/scraping/scraping.js";

const handlerFunction = async function (event, context) {
  scrapeAndSaveToDatabase();

  return {
    statusCode: 200,
  };
};

export const handler = schedule("@hourly", handlerFunction);
