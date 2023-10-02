import { toast } from "react-toastify";
import { WeightclassEnumT } from "../../types/WeightClassEnumT";
import { MatchupT } from "../../types/MatchupT";

export const voteForMatchup = async ({
  matchupsOfFighter,
  idOfChosenOpponent,
  fighterId,
  voterId,
  weightclass,
  patchMatchup,
  addMatchup,
}: {
  matchupsOfFighter: MatchupT[] | [];
  idOfChosenOpponent: string;
  fighterId: string;
  voterId: string;
  weightclass: WeightclassEnumT;
  patchMatchup: any;
  addMatchup: any;
}) => {
  const alreadyExistingMatchup = matchupsOfFighter.find(
    (matchup) =>
      matchup.matched_fighters.includes(fighterId) &&
      matchup.matched_fighters.includes(idOfChosenOpponent)
  );

  if (alreadyExistingMatchup) {
    const hasUserAlreadyVotedForThatMatchup = Boolean(
      alreadyExistingMatchup.ids_of_voters.find((id: string) => id === voterId)
    );

    patchMatchup({
      matchupId: alreadyExistingMatchup._id,
      voterId,
      hasUserAlreadyVotedForThatMatchup,
      weightclass,
    });
    const toastMessage = hasUserAlreadyVotedForThatMatchup
      ? "You unvoted a matchup"
      : "You voted for a matchup";
    toast.info(toastMessage);
  } else {
    addMatchup({
      fightersIds: [fighterId, idOfChosenOpponent],
      voterId,
      weightclass,
    });
    toast.info(`You voted for a matchup`);
  }
};
