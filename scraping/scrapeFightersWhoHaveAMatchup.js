import { closeCookiesModal } from "./utils.js";
import { WEIGHT_CLASSES_NAMES } from "./constants.js";

const scrapeFightersWhoHaveAMatchup = async (url, page) => {
  const scrapedFightersWithAMatchup = {};
  // const scrapedFightersWithAMatchup = [];
  await page.goto(url);
  await closeCookiesModal(page);
  //tu będzie loop na wchodzenie do kolejnych eventów
  // for (let i = 1; ; i++) {
  for (let numberOfSection = 1, j = 1; ; j++) {
    const scrapedEvent = await page.evaluate(
      (numberOfSection, j) =>
        document.querySelector(
          `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(${numberOfSection}) > ul > li:nth-child(${j})`
        ),
      numberOfSection,
      j
    );
    let isThereMoreAfterLoadedMore;
    if (!scrapedEvent) {
      console.log(`loading: i: ${numberOfSection}, j: ${j}`);
      for (let m = 0; m < numberOfSection; m++) {
        console.log(`m: ${m} i: ${numberOfSection}, j: ${j}`);
        const scrapedLoadMoreButton = await page.evaluate(() =>
          document.querySelector(
            `#events-list-upcoming > div > div > ul > li > a`
          )
        );

        console.log("scrapedLoadMoreButton", scrapedLoadMoreButton);
        // await page.evaluate(() =>
        //   document.querySelector(
        //     `#events-list-upcoming > div > div > ul > li > a`,
        //     (elem) => elem.click()
        //   )
        // );
        // await page.evaluate((_) => {
        //   window.scrollBy(0, 1.5 * window.innerHeight);
        // });
        // await page.screenshot({ path: `buddyn${i}${j}shot.png` });
        if (scrapedLoadMoreButton) {
          await page.$eval(
            `#events-list-upcoming > div > div > ul > li > a`,
            (elem) => {
              elem ? elem.click() : null;
            }
          );
          await page.waitForSelector(
            `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(${
              m + 2
            }) > ul > li:nth-child(${1}) > article > div.c-card-event--result__info > h3 > a`
          );
          // i++
          // j=1
          // const scrapedEvent = await page.evaluate(
          //   (i, j) =>
          //     document.querySelector(
          //       `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(${i}) > ul > li:nth-child(${j})`
          //     ),
          //   i,
          //   j
          // );
          // if (scrapedEvent) isThereMoreAfterLoadedMore = true;

          if (m === numberOfSection - 1 && scrapedLoadMoreButton) {
            //jak doszliśmy do kliknięcia "load more" odpowiednią ilość razy w stosunku do tego w której sekcji byliśmy ostatnio

            //tu trzeba sprawdzić czy zmieniamy już sekcję (nie ma więcej eventów w tej sekcji)
            const queriedEventInCurrentSection = await page.evaluate(
              (numberOfSection, j) =>
                document.querySelector(
                  `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(${numberOfSection}) > ul > li:nth-child(${j}) > article > div.c-card-event--result__info > h3 > a`
                ),
              numberOfSection,
              j
            );
            if (!queriedEventInCurrentSection) {
              numberOfSection++;
              j = 1;
            }
            isThereMoreAfterLoadedMore = true;

            // if (j === 4) {
            //   numberOfSection++;
            //   j = 1;
            // }
          }
        } else {
          isThereMoreAfterLoadedMore = false;
          break;
        }
      }
    }
    // if (!scrapedEvent) {
    //   i = 1;
    //   scrapedEvent = await page.evaluate(
    //     (i) =>
    //       document.querySelector(
    //         `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(2) > ul > li:nth-child(${i})`
    //       ),
    //     i
    //   );
    // }
    console.log("numberOfSection", numberOfSection);
    console.log("j", j);
    console.log("scrapedEvent", scrapedEvent);
    if (!scrapedEvent && !isThereMoreAfterLoadedMore) {
      break;
    } else {
      await page.evaluate((_) => {
        window.scrollBy(0, 1.5 * window.innerHeight);
      });
      await page.screenshot({
        path: `buddy${numberOfSection}${j}-screenshot.png`,
      });
      await page.$eval(
        `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(${numberOfSection}) > ul > li:nth-child(${j}) > article > div.c-card-event--result__info > h3 > a`,
        (elem) => {
          elem.click();
        }
      );

      for (let k = 1; ; k++) {
        const scrapedFight = await page.evaluate(
          (k) =>
            document.querySelector(
              `#edit-group-main-card > div > div > section > ul > li:nth-child(${k})`
            ),
          k
        );
        const scrapedFightWithDifferentSelector = await page.evaluate(
          (k) =>
            document.querySelector(
              `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${k})`
            ),
          k
        );
        let shouldUseRegularSelectors = true;
        if (scrapedFight) shouldUseRegularSelectors = true;
        if (scrapedFightWithDifferentSelector)
          shouldUseRegularSelectors = false;

        // const scrapedFight = document.querySelector(
        //   `#edit-group-main-card > div > div > section > ul > li:nth-child(${i})`
        // );
        if (!scrapedFight && !scrapedFightWithDifferentSelector) {
          break;
        } else {
          const infoScrapedFromASingleFight = await scrapeInfoFromASingleFight(
            k,
            page,
            shouldUseRegularSelectors
          );
          // if the length equals 1, that means that only the weightclass was scraped, so there are no ranked fighters in that fight
          if (infoScrapedFromASingleFight.namesOfFighters.length !== 0) {
            scrapedFightersWithAMatchup[
              infoScrapedFromASingleFight.weightClassOfTheFight
            ]
              ? scrapedFightersWithAMatchup[
                  infoScrapedFromASingleFight.weightClassOfTheFight
                ].push(...infoScrapedFromASingleFight.namesOfFighters)
              : (scrapedFightersWithAMatchup[
                  infoScrapedFromASingleFight.weightClassOfTheFight
                ] = infoScrapedFromASingleFight.namesOfFighters);
            // scrapedFightersWithAMatchup.push(infoScrapedFromASingleFight);
          }
        }
      }

      // const infoScrapedFromASingleFight = await scrapeInfoFromASingleFight(
      //   0,
      //   page
      // );
      // console.log(
      //   "infoScrapedFromASingleFight",
      //   infoScrapedFromASingleFight
      // );
      console.log("scrapedFightersWithAMatchup", scrapedFightersWithAMatchup);
    }
    await page.goto(url);
    await closeCookiesModal(page);
  }
  return scrapedFightersWithAMatchup;
  // }
};

const scrapeInfoFromASingleFight = async (
  numberOfTheDivRepresentingAFight,
  page,
  shouldUseRegularSelectors
) => {
  const CORNERS = {
    blue: "blue",
    red: "red",
  };

  const nameOfOneFighter = await scrapeFighterFromACorner(
    CORNERS.red,
    numberOfTheDivRepresentingAFight,
    page,
    shouldUseRegularSelectors
  );
  const nameOfOtherFighter = await scrapeFighterFromACorner(
    CORNERS.blue,
    numberOfTheDivRepresentingAFight,
    page,
    shouldUseRegularSelectors
  );
  const weightClassOfTheFight = await scrapeWeightclassOfFight(
    numberOfTheDivRepresentingAFight,
    page,
    shouldUseRegularSelectors
  );
  console.log("halo", nameOfOneFighter);
  console.log("halo", nameOfOtherFighter);
  console.log("halo", weightClassOfTheFight);
  const namesOfFighters = [
    nameOfOneFighter,
    nameOfOtherFighter,
    // weightClassOfTheFight,
  ].filter((el) => el);

  return { namesOfFighters, weightClassOfTheFight };
  // return [nameOfOneFighter, nameOfOtherFighter, weightClassOfTheFight]
};

const scrapeFighterFromACorner = async (
  cornerColor,
  numberOfTheDivRepresentingAFight,
  page,
  shouldUseRegularSelectors
) => {
  const isRanked = await checkIfFighterIsRanked(
    page,
    cornerColor,
    numberOfTheDivRepresentingAFight,
    shouldUseRegularSelectors
  );
  if (isRanked) {
    const fighterGivenName = await page.evaluate(
      (
        cornerColor,
        numberOfTheDivRepresentingAFight,
        shouldUseRegularSelectors
      ) => {
        const scrapedFighterGivenName = document.querySelector(
          shouldUseRegularSelectors
            ? `#edit-group-main-card > div > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-given-name`
            : `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-given-name`
        );
        return scrapedFighterGivenName
          ? scrapedFighterGivenName.textContent
          : null;
      },
      cornerColor,
      numberOfTheDivRepresentingAFight,
      shouldUseRegularSelectors
    );

    const fighterFamilyName = await page.evaluate(
      (
        cornerColor,
        numberOfTheDivRepresentingAFight,
        shouldUseRegularSelectors
      ) => {
        const scrapedFighterFamilyName = document.querySelector(
          shouldUseRegularSelectors
            ? `#edit-group-main-card > div > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-family-name`
            : `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-family-name`
        );
        return scrapedFighterFamilyName
          ? scrapedFighterFamilyName.textContent
          : null;
      },
      cornerColor,
      numberOfTheDivRepresentingAFight,
      shouldUseRegularSelectors
    );
    let fighterFullName;
    if (!fighterGivenName || !fighterFamilyName) {
      const fighterName = await page.evaluate(
        (
          cornerColor,
          numberOfTheDivRepresentingAFight,
          shouldUseRegularSelectors
        ) => {
          const scrapedFighterName = document.querySelector(
            shouldUseRegularSelectors
              ? `#edit-group-main-card > div > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name`
              : `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name`
          );
          return scrapedFighterName ? scrapedFighterName.outerText : null;
        },
        cornerColor,
        numberOfTheDivRepresentingAFight,
        shouldUseRegularSelectors
      );
      fighterFullName = fighterName.replace(/\n/g, "").trim();
    } else {
      fighterFullName = `${fighterGivenName} ${fighterFamilyName}`;
    }
    return fighterFullName;
  }
};

const checkIfFighterIsRanked = async (
  page,
  cornerColor,
  numberOfTheDivRepresentingAFight,
  shouldUseRegularSelectors
) => {
  const isRanked = await page.evaluate(
    (
      cornerColor,
      numberOfTheDivRepresentingAFight,
      shouldUseRegularSelectors
    ) => {
      const scrapedChampionLabelOrRankNumber = document.querySelector(
        shouldUseRegularSelectors
          ? `#edit-group-main-card > div > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.js-listing-fight__corner-rank.c-listing-fight__corner-rank > span`
          : `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor}>div:nth-child(2)>span`
      );
      return scrapedChampionLabelOrRankNumber ? true : false;
    },
    cornerColor,
    numberOfTheDivRepresentingAFight,
    shouldUseRegularSelectors
  );
  console.log("isRanked", isRanked);
  return isRanked;
};

const scrapeWeightclassOfFight = async (
  numberOfTheDivRepresentingAFight,
  page,
  shouldUseRegularSelectors
) => {
  const weightclassOfFight = await page.evaluate(
    (numberOfTheDivRepresentingAFight, shouldUseRegularSelectors) => {
      const scrapedWeightclassOfFight = document.querySelector(
        shouldUseRegularSelectors
          ? `#edit-group-main-card > div > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__details > div.c-listing-fight__class`
          : `#block-mainpagecontent > div > div.l-main > div > div > div.l-container.event-details-ad--prev-sibling > div > section > ul > li:nth-child(${numberOfTheDivRepresentingAFight}) > div > div > div > div.c-listing-fight__details > div.c-listing-fight__class`
      );
      return scrapedWeightclassOfFight
        ? scrapedWeightclassOfFight.textContent
        : null;
    },
    numberOfTheDivRepresentingAFight,
    shouldUseRegularSelectors
  );

  const isWomens = /women/gi.test(weightclassOfFight);
  const weightClassOfFightFiltered = weightclassOfFight
    .split(" ")
    .filter((el) => el !== "Title" && el !== "Interim");

  return isWomens
    ? "women" + weightClassOfFightFiltered.slice(1, -1).join("")
    : weightClassOfFightFiltered.slice(0, -1).join("");
};

export { scrapeFightersWhoHaveAMatchup };
