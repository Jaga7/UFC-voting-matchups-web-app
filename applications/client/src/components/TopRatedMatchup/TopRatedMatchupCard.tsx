import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material";

const TopRatedMatchupCard = ({ matchupWithFighters }: any) => {
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
          textAlign='center'
          justifyContent='center'
        >
          <CardHeader
            title={
              <ul>
                <li>{matchupWithFighters.matched_fighters[0].fullname}</li>
                <li>vs</li>
                <li>{matchupWithFighters.matched_fighters[1].fullname}</li>
              </ul>
            }
            subheader={
              <Typography>{matchupWithFighters.weightclass}</Typography>
            }
          />
        </Box>
        <CardContent>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='body2' color='text.secondary'>
              Number of votes:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {matchupWithFighters.votersAmount}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default TopRatedMatchupCard;
