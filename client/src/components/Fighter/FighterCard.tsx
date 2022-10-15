import { useTheme } from "@mui/material";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
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

const FighterCard = ({
  fighter,
  opponents,
  matchupsOfFighter,
}: {
  fighter: FighterT;
  opponents: FighterT[];
  matchupsOfFighter: MatchupT[];
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const authState: AuthState = useAppSelector((state) => state.authReducer);

  const [patchMatchup] = usePatchMatchupMutation();
  const [addMatchup] = useAddMatchupMutation();

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
          {/* <Avatar
            src={fighter.avatarUrl}
            sx={{
              width: '48px',
              height: '48px',
              backgroundColor: theme.palette.background.paper,
              marginLeft: '0.5em',
            }}
          /> */}
          <CardHeader
            title={fighter.fullname}
            // subheader={<Typography>{fighter.rank}</Typography>}
          />
        </Box>
        <CardContent>
          <Box
            onClick={(e) => {
              const clickedButton = e.target as HTMLButtonElement;
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
              const thisMatchupVoters = matchupsOfFighter.find((matchup) =>
                matchup.matched_fighters.some((id) => id === opponent._id)
              )?.ids_of_voters;
              const didCurrentUserVoteForThisMatchup = thisMatchupVoters?.find(
                (voterId) => voterId === authState.currentUser!._id
              );
              return (
                <Box key={opponent._id}>
                  <Button
                    color={
                      didCurrentUserVoteForThisMatchup ? "success" : "primary"
                    }
                  >
                    {opponent.fullname}
                  </Button>
                  <Typography>
                    votes:
                    {thisMatchupVoters?.length || 0}
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
