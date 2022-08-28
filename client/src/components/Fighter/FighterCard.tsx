import { useTheme } from "@mui/material";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

import { FighterT } from "../../types/FighterT";

const FighterCard = ({ fighter }: { fighter: FighterT }) => {
  const theme = useTheme();

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
              <strong>Matchups: </strong>
              {fighter.matchups.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default FighterCard;
