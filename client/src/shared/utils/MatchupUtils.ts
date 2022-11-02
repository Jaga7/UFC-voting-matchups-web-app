import { toast } from "react-toastify";
import { getAMatchup } from "../../features/matchups/matchupsAsyncActions";
import { WeightclassEnumT } from "../../types/WeightClassEnumT";

export const voteForMatchup = async ({
  idOfChosenOpponent,
  fighterId,
  voterId,
  weightclass,
  dispatch,
  patchMatchup,
  addMatchup,
}: {
  idOfChosenOpponent: string;
  fighterId: string;
  voterId: string;
  weightclass: WeightclassEnumT;
  dispatch: any;
  patchMatchup: any;
  addMatchup: any;
}) => {
  try {
    const fetchedMatchup = await dispatch(
      getAMatchup({
        oneFighterId: fighterId,
        otherFighterId: idOfChosenOpponent,
      })
    ).unwrap();

    if (fetchedMatchup == null) {
      addMatchup({
        fightersIds: [fighterId, idOfChosenOpponent],
        voterId,
        weightclass,
      });
      toast.info(`You voted for a matchup`);
    } else {
      const hasUserAlreadyVotedForThatMatchup = Boolean(
        fetchedMatchup.ids_of_voters.find((id: string) => id === voterId)
      );

      patchMatchup({
        matchupId: fetchedMatchup._id,
        voterId,
        hasUserAlreadyVotedForThatMatchup,
        weightclass,
      });
      const toastMessage = hasUserAlreadyVotedForThatMatchup
        ? "You unvoted a matchup"
        : "You voted for a matchup";
      toast.info(toastMessage);
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.message);
  }
};
