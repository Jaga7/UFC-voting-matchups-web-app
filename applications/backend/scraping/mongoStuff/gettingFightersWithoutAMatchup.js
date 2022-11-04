export const getFightersWithoutAMatchupFromScrapedData = async (
  scrapedRankedFighters,
  scrapedFightersWithAMatchup
) => {
  const scrapedFightersWithoutAMatchup = {};
  for (const weightclass of Object.keys(scrapedRankedFighters)) {
    scrapedFightersWithoutAMatchup[weightclass] = scrapedFightersWithAMatchup[
      weightclass
    ]
      ? scrapedRankedFighters[weightclass].filter(
          (fighter) =>
            !scrapedFightersWithAMatchup[weightclass].includes(fighter)
        )
      : scrapedRankedFighters[weightclass];
  }

  return scrapedFightersWithoutAMatchup;
};
