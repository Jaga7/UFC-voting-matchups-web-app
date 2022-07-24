import { closeCookiesModal } from "./utils.js";

const scrapeAllFighters = async (url, page) => {
  await page.goto(url);

  closeCookiesModal(page);

  const WEIGHT_CLASSES_NAMES = {
    menFlyweight: "menFlyweight",
    menBantamweight: "menBantamweight",
    menFeatherweight: "menFeatherweight",
    menLightweight: "menLightweight",
    menWelterweight: "menWelterweight",
    menMiddleweight: "menMiddleweight",
    menLightheavyweight: "menLightheavyweight",
    menHeavyweight: "menHeavyweight",
    womenStrawweight: "womenStrawweight",
    womenFlyweight: "womenFlyweight",
    womenBantamweight: "womenBantamweight",
  };

  const WEIGHT_CLASSES_NUMBERS = {
    menFlyweight: 2,
    menBantamweight: 3,
    menFeatherweight: 4,
    menLightweight: 5,
    menWelterweight: 6,
    menMiddleweight: 7,
    menLightheavyweight: 8,
    menHeavyweight: 9,
    womenStrawweight: 11,
    womenFlyweight: 12,
    womenBantamweight: 13,
  };

  const weightclassesFighters = {};

  for (const weightClass in WEIGHT_CLASSES_NAMES) {
    weightclassesFighters[weightClass] = await scrapeWeightclass(
      WEIGHT_CLASSES_NUMBERS[weightClass],
      page
    );
  }

  for (const weightclassFighters in weightclassesFighters) {
    console.log(
      `${weightclassFighters}`,
      weightclassesFighters[weightclassFighters]
    );
  }
  return weightclassesFighters;
};

const scrapeWeightclass = async (weightclassNumber, page) => {
  const fightersFromWeightclass = await page.evaluate(
    (weightclassNumber) =>
      Array.from(
        document.querySelectorAll(
          `#block-mainpagecontent > div > div.l-container > div > div > div > div.view-content > div:nth-child(${weightclassNumber}) > div.view-grouping-content > table > tbody > tr > td.views-field.views-field-title > div > div > div > a`
        ),
        (element) => element.textContent
      ),
    weightclassNumber
  );

  const champion = await page.evaluate((weightclassNumber) => {
    const scrapedChampion = document.querySelector(
      `#block-mainpagecontent > div > div.l-container > div > div > div > div.view-content > div:nth-child(${weightclassNumber}) > div.view-grouping-content > table > caption > div > div.info > h5 > div > div > div > a`
    );
    return scrapedChampion ? scrapedChampion.textContent : null;
  }, weightclassNumber);

  champion && fightersFromWeightclass.unshift(champion);

  return fightersFromWeightclass;
};

export { scrapeAllFighters };
