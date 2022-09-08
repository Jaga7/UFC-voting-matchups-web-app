import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

import { FighterT } from "../../types/FighterT";

import {
  useGetAMatchupQuery,
  usePatchMatchupMutation,
} from "../../services/matchups-service";
import { voteForMatchup } from "../../features/matchups/matchupsAsyncActions";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { AuthState } from "../../types/AuthT";
import { MatchupT } from "../../types/MatchupT";

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

  // const [selectedOpponentId, setSelectedOpponentId] = useState(null);
  // const handleChange = async (e: any) => {
  //   e.preventDefault();
  //   setSelectedOpponentId(e.target.value);
  //   console.log(
  //     "siema",
  //     fighter.fullname,
  //     e.target.value,
  //     opponents.find((opponent) => opponent._id === e.target.value)?.fullname
  //   );
  //   try {
  //     const promiseResponse = dispatch(
  //       voteForMatchup({
  //         fightersIds: {
  //           oneFighterId: fighter._id,
  //           otherFighterId: e.target.value,
  //         },
  //         voterId: authState.currentUser!._id,
  //       })
  //     ).unwrap();
  //     console.log(`i jaki ten promiseResponse: ${promiseResponse}`);
  //   } catch (rejectedValueOrSerializedError: any) {
  //     throw Error(rejectedValueOrSerializedError);
  //   }
  // };
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
          {/* <Box
            display='flex'
            flexDirection='row'
            flexWrap='wrap'
            gap='1em'
            justifyContent='space-between'
          >
            <Typography variant='body2' color='text.secondary'>
              <strong>Opponents: </strong>
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Opponent</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={selectedOpponentId || opponents[0]._id}
                label='Opponent'
                onChange={handleChange}
              >
                {opponents.map((opponent) => (
                  <MenuItem key={opponent._id} value={opponent._id}>
                    {opponent.fullname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box> */}
          <Box
            onClick={(e) => {
              const clickedButton = e.target as HTMLButtonElement;
              const nameOfChosenOpponent =
                clickedButton.firstChild?.textContent;
              const idOfChosenOpponent = opponents.find(
                (opponent) => opponent.fullname === nameOfChosenOpponent
              )!._id;

              dispatch(
                voteForMatchup({
                  fightersIds: {
                    oneFighterId: fighter._id,
                    otherFighterId: idOfChosenOpponent,
                  },
                  voterId: authState.currentUser!._id,
                  weightclass: fighter.weightclass,
                })
              );
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
