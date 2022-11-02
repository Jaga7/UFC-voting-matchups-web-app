import Matchup from "../models/Matchup.js";
import { StatusCodes } from "http-status-codes";
// import checkPermissions from "../utils/checkPermissions.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getMatchups = async (req, res) => {
  const { oneFighterId, otherFighterId, weightclass, getTopVoted } = req.query;

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

  if (getTopVoted) {
    result = Matchup.find().sort({ votersAmount: -1 }).limit(6);
  }
  const matchups = await result;

  res.status(StatusCodes.OK).json(matchups);
};

const toggleVoteForMatchup = async (req, res) => {
  const { id: matchupId } = req.params;
  const { voterId } = req.body;

  if (!voterId) {
    throw new BadRequestError("Please Provide All Values");
  }

  const matchup = await Matchup.findOne({ _id: matchupId });

  if (!matchup) {
    throw new NotFoundError(`No matchup with id ${matchupId}`);
  }

  // check if voter already voted for this matchup
  const hasUserVotedForThisMatchup = matchup.ids_of_voters.includes(voterId);

  const updatedMatchup = await Matchup.findOneAndUpdate(
    { _id: matchupId },
    hasUserVotedForThisMatchup
      ? { $pull: { ids_of_voters: voterId }, $inc: { votersAmount: -1 } }
      : { $push: { ids_of_voters: voterId }, $inc: { votersAmount: 1 } },
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
    votersAmount: 1,
    weightclass: weightclass,
  });
  res.status(StatusCodes.CREATED).json({ matchup });
};

export { getMatchups, toggleVoteForMatchup, createMatchup };
