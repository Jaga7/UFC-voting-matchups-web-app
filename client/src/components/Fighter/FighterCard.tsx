import { useTheme } from "@mui/material";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { FighterT } from "../../types/FighterT";

import {
  usePatchMatchupMutation,
  useAddMatchupMutation,
} from "../../services/matchups-service";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { AuthState } from "../../types/AuthT";
import { MatchupT } from "../../types/MatchupT";
import { voteForMatchup } from "../../shared/utils/MatchupUtils";
import { useEffect, useState } from "react";

const FighterCard = ({
  fighter,
  opponents,
  matchupsOfFighter,
  areMatchupsFetching,
}: {
  fighter: FighterT;
  opponents: FighterT[];
  matchupsOfFighter: MatchupT[] | [];
  areMatchupsFetching: boolean;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const authState: AuthState = useAppSelector((state) => state.authReducer);

  const [patchMatchup] = usePatchMatchupMutation();
  const [addMatchup] = useAddMatchupMutation();

  // state variable to store disable state of vote buttons
  const [areVoteButtonsDisabled, setAreVoteButtonsDisabled] = useState(false);

  useEffect(() => {
    if (!areMatchupsFetching) {
      setAreVoteButtonsDisabled(false);
    }
  }, [areMatchupsFetching]);

  return (
    <>
      <Card>
        <Box
          sx={{
            backgroundColor: theme.palette.background.light,
            color: theme.palette.primary.contrastText,
          }}
          display='flex'
          flexWrap='wrap'
          alignItems='center'
        >
          <CardHeader title={fighter.fullname} />
        </Box>
        <CardContent>
          <Box
            onClick={(e) => {
              const clickedButton = e.target as HTMLButtonElement;

              if (areVoteButtonsDisabled) {
                // e.stopPropagation();
                return;
              }

              const nameOfChosenOpponent =
                clickedButton.firstChild?.textContent;
              const idOfChosenOpponent = opponents.find(
                (opponent) => opponent.fullname === nameOfChosenOpponent
              )!._id;
              voteForMatchup({
                idOfChosenOpponent,
                fighterId: fighter._id,
                voterId: authState.currentUser!._id,
                weightclass: fighter.weightclass,
                dispatch,
                patchMatchup,
                addMatchup,
              });
            }}
            display='flex'
            flexDirection='row'
            flexWrap='wrap'
            gap='1em'
            justifyContent='space-between'
          >
            <Typography variant='body2' color='text.secondary'>
              Opponents:
            </Typography>
            {opponents.map((opponent) => {
              const thisMatchup = matchupsOfFighter.find((matchup) =>
                matchup.matched_fighters.some((id) => id === opponent._id)
              );
              const thisMatchupVoters = thisMatchup?.ids_of_voters;
              const didCurrentUserVoteForThisMatchup = thisMatchupVoters?.find(
                (voterId) => voterId === authState.currentUser!._id
              );
              return (
                <Box key={opponent._id}>
                  <Button
                    color={
                      didCurrentUserVoteForThisMatchup ? "success" : "primary"
                    }
                    disabled={areVoteButtonsDisabled}
                    onClick={(e) => {
                      setAreVoteButtonsDisabled(true);
                      if (areVoteButtonsDisabled) {
                        e.stopPropagation();
                        return;
                      }
                    }}
                  >
                    {opponent.fullname}
                  </Button>
                  <Typography>
                    votes:
                    {thisMatchup?.votersAmount || 0}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default FighterCard;
