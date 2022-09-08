import Matchup from "../models/Matchup.js";
import { StatusCodes } from "http-status-codes";
// import checkPermissions from "../utils/checkPermissions.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getMatchups = async (req, res) => {
  const { oneFighterId, otherFighterId, weightclass } = req.query;

  const queryObject = {};

  if (oneFighterId && otherFighterId) {
    queryObject.matched_fighters = {
      $all: [oneFighterId, otherFighterId],
    };
  }

  if (weightclass && weightclass !== "all") {
    queryObject.weightclass = weightclass;
  }

  console.log("halo weightclass: ", weightclass);
  // NO AWAIT
  let result = Matchup.find(queryObject);

  const matchups = await result;
  console.log("są te matchupy?: ", matchups);
  if (matchups.length === 0) {
    res.status(StatusCodes.OK).json(null);
  } else {
    res.status(StatusCodes.OK).json(matchups);
  }
};

// const getAMatchup = async (req, res) => {
//   const { oneFighterId, otherFighterId } = req.query;

//   const queryObject = {};

//   queryObject.matched_fighters = {
//     $all: [oneFighterId, otherFighterId],
//   };

//   // NO AWAIT
//   let result = Matchup.findOne(queryObject);

//   const matchup = await result;
//   console.log("to jest ten matchup czy go nie ma ", matchup);
//   if (matchup === null) {
//     res.status(StatusCodes.OK).json(null);
//   } else {
//     res.status(StatusCodes.OK).json({ matchup });
//   }
// };

const appendVoteToMatchup = async (req, res) => {
  const { id: matchupId } = req.params;
  const { voterId } = req.body;

  if (!voterId) {
    throw new BadRequestError("Please Provide All Values");
  }

  const matchup = await Matchup.findOne({ _id: matchupId });

  if (!matchup) {
    throw new NotFoundError(`No matchup with id ${matchupId}`);
  }

  // NIE REST-OWO:
  //   await Matchup.findOneAndUpdate(
  //     { fullname: fighter },
  //     { $setOnInsert: { fullname: fighter, weightclass: weightclass } },
  //     { upsert: true }
  //   );

  const updatedMatchup = await Matchup.findOneAndUpdate(
    { _id: matchupId },
    { $push: { ids_of_voters: voterId } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedMatchup });
};

const createMatchup = async (req, res) => {
  const { fightersIds, voterId, weightclass } = req.body;

  if (!fightersIds || !voterId || !weightclass) {
    throw new BadRequestError("Please Provide All Values");
  }

  const matchup = await Matchup.create({
    matched_fighters: [fightersIds.oneFighterId, fightersIds.otherFighterId],
    ids_of_voters: [voterId],
    weightclass: weightclass,
  });
  res.status(StatusCodes.CREATED).json({ matchup });
};

export { getMatchups, appendVoteToMatchup, createMatchup };
