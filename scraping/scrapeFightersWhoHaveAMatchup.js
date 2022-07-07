import { closeCookiesModal } from "./utils.js"

const scrapeFightersWhoHaveAMatchup = async (url, page) => {
  await page.goto(url)
  await closeCookiesModal(page)
  //tu będzie loop na wchodzenie do kolejnych eventów, na razie zrobię dla jednego eventu
  await page.$eval(
    `#events-list-upcoming > div > div > div.l-container > div > div > section:nth-child(1) > ul > li:nth-child(1) > article > div.c-card-event--result__info > h3 > a`,
    (elem) => elem.click()
  )
  const weightClassesNames = {
    strawweight: "strawweight",
    flyweight: "flyweight",
    bantamweight: "bantamweight",
    featherweight: "featherweight",
    lightweight: "lightweight",
    welterweight: "welterweight",
    middleweight: "middleweight",
    lightheavyweight: "lightheavyweight",
    heavyweight: "heavyweight",
  }
  const scrapedFightersWithAMatchup = [{}]
  const fightersScrapedFromASingleFight = await scrapeFightersFromASingleFight(
    0,
    page
  )
  console.log(
    "fightersScrapedFromASingleFight",
    fightersScrapedFromASingleFight
  )
}

const scrapeFightersFromASingleFight = async (
  pewnieNumerJakisElementu,
  page
) => {
  const corners = {
    blue: "blue",
    red: "red",
  }

  const nameOfOneFighter = await scrapeFighterFromACorner(corners.red, page)
  const nameOfOtherFighter = await scrapeFighterFromACorner(corners.blue, page)
  const weightClassOfTheFight = await scrapeWeightclassOfFight(page)
  return [nameOfOneFighter, nameOfOtherFighter, weightClassOfTheFight]
}

const scrapeFighterFromACorner = async (cornerColor, page) => {
  const isRanked = await page.evaluate((cornerColor) => {
    const scrapedChampionOrRankNumber = document.querySelector(
      `#edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.js-listing-fight__corner-rank.c-listing-fight__corner-rank > span`
    )
    return scrapedChampionOrRankNumber ? true : false
  }, cornerColor)

  if (isRanked) {
    const fighterGivenName = await page.evaluate((cornerColor) => {
      const scrapedFighterGivenName = document.querySelector(
        `#edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-given-name`
      )
      return scrapedFighterGivenName
        ? scrapedFighterGivenName.textContent
        : null
    }, cornerColor)

    const fighterFamilyName = await page.evaluate((cornerColor) => {
      const scrapedFighterFamilyName = document.querySelector(
        `#edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name > span.c-listing-fight__corner-family-name`
      )
      return scrapedFighterFamilyName
        ? scrapedFighterFamilyName.textContent
        : null
    }, cornerColor)
    let fighterFullName
    if (!fighterGivenName || !fighterFamilyName) {
      const fighterName = await page.evaluate((cornerColor) => {
        const scrapedFighterName = document.querySelector(
          `#edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__corner--${cornerColor} > div.c-listing-fight__corner-body--${cornerColor} > div.c-listing-fight__corner-name`
        )
        return scrapedFighterName ? scrapedFighterName.outerText : null
      }, cornerColor)
      fighterFullName = fighterName.replace(/\n/g, "").trim()
    } else {
      fighterFullName = `${fighterGivenName} ${fighterFamilyName}`
    }
    return fighterFullName
  }
}

// #edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__details > div:nth-child(4)

// #edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__details > div:nth-child(6)

const scrapeWeightclassOfFight = async (page) => {
  const weightclassOfFight = await page.evaluate(() => {
    const scrapedWeightclassOfFight = document.querySelector(
      `#edit-group-main-card > div > div > section > ul > li:nth-child(1) > div > div > div > div.c-listing-fight__details > div.c-listing-fight__class`
    )
    return scrapedWeightclassOfFight
      ? scrapedWeightclassOfFight.textContent
      : null
  })
  return weightclassOfFight.split(" ")[0]
}

export { scrapeFightersWhoHaveAMatchup }
