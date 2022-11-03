import Fighter from "../../models/Fighter.js";
import Matchup from "../../models/Matchup.js";

export const handleNewlyScrapedData = async (
  scrapedFightersWithoutAMatchup
) => {
  const scrapedFightersNames = [];
  for (const weightclass of Object.keys(scrapedFightersWithoutAMatchup)) {
    for (const fighterName of scrapedFightersWithoutAMatchup[weightclass]) {
      scrapedFightersNames.push(fighterName);
    }
  }
  let toBeDeletedFightersObjectIds = await Fighter.find({
    fullname: { $not: { $in: scrapedFightersNames } },
  }).distinct("_id");

  await Fighter.deleteMany({
    _id: {
      $in: toBeDeletedFightersObjectIds,
    },
  });

  await Matchup.deleteMany({
    matched_fighters: { $in: toBeDeletedFightersObjectIds },
  });

  const createFightersForWeightclass = async (weightclass) => {
    for (const fighter of scrapedFightersWithoutAMatchup[weightclass]) {
      await Fighter.findOneAndUpdate(
        { fullname: fighter },
        { $setOnInsert: { fullname: fighter, weightclass: weightclass } },
        { upsert: true }
      );
    }
  };

  for (const weightclass of Object.keys(scrapedFightersWithoutAMatchup)) {
    await createFightersForWeightclass(weightclass);
  }
};
