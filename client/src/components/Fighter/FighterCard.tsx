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

const FighterCard = ({
  fighter,
  opponents,
}: {
  fighter: FighterT;
  opponents: FighterT[];
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const authState: AuthState = useAppSelector((state) => state.authReducer);

  const [selectedOpponentId, setSelectedOpponentId] = useState(null);
  const handleChange = async (e: any) => {
    e.preventDefault();
    setSelectedOpponentId(e.target.value);
    console.log(
      "siema",
      fighter.fullname,
      e.target.value,
      opponents.find((opponent) => opponent._id === e.target.value)?.fullname
    );
    try {
      const promiseResponse = dispatch(
        voteForMatchup({
          fightersIds: {
            oneFighterId: fighter._id,
            otherFighterId: e.target.value,
          },
          voterId: authState.currentUser!._id,
        })
      ).unwrap();
      console.log(`i jaki ten promiseResponse: ${promiseResponse}`);
    } catch (rejectedValueOrSerializedError: any) {
      throw Error(rejectedValueOrSerializedError);
    }
  };
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default FighterCard;
