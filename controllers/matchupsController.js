import Matchup from "../models/Matchup.js";
import { StatusCodes } from "http-status-codes";
// import checkPermissions from "../utils/checkPermissions.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getMatchups = async (req, res) => {
  const { oneFighterId, otherFighterId, weightclass } = req.query;

  const queryObject = {};

  let result;
  if (oneFighterId && otherFighterId) {
    queryObject.matched_fighters = {
      $all: [oneFighterId, otherFighterId],
    };
    result = Matchup.findOne(queryObject);
  }

  if (weightclass && weightclass !== "all") {
    queryObject.weightclass = weightclass;
    result = Matchup.find(queryObject);
  }

  const matchups = await result;

  res.status(StatusCodes.OK).json(matchups);
};

const toggleVoteForMatchup = async (req, res) => {
  const { id: matchupId } = req.params;
  const { voterId, hasUserAlreadyVotedForThatMatchup } = req.body;

  if (!voterId || hasUserAlreadyVotedForThatMatchup == null) {
    throw new BadRequestError("Please Provide All Values");
  }

  const matchup = await Matchup.findOne({ _id: matchupId });

  if (!matchup) {
    throw new NotFoundError(`No matchup with id ${matchupId}`);
  }

  const updatedMatchup = await Matchup.findOneAndUpdate(
    { _id: matchupId },
    hasUserAlreadyVotedForThatMatchup
      ? { $pull: { ids_of_voters: voterId } }
      : { $push: { ids_of_voters: voterId } },
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
    matched_fighters: fightersIds,
    ids_of_voters: [voterId],
    weightclass: weightclass,
  });
  res.status(StatusCodes.CREATED).json({ matchup });
};

export { getMatchups, toggleVoteForMatchup, createMatchup };
