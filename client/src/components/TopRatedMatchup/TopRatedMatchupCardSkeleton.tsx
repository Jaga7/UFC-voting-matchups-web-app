import {
  useTheme,
  Skeleton,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";

function TopRatedMatchupCardSkeleton() {
  const theme = useTheme();
  return (
    <>
      <Card>
        <Box
          sx={{
            backgroundColor: theme.palette.background.light,
            color: theme.palette.primary.contrastText,
            paddingBottom: "0.5em",
            paddingTop: "0.5em",
          }}
        >
          <CardHeader
            title={""}
            subheader={
              <Typography>
                <Skeleton height={40} />
                <Skeleton height={32} />
                <Skeleton height={40} />
                <Skeleton height={32} />
              </Typography>
            }
          />
          <Box marginLeft='auto' marginRight='0.5em'></Box>
        </Box>
        <CardContent>
          <Box
            display='flex'
            flexDirection='column'
            flexWrap='wrap'
            gap='1em'
            justifyContent='space-between'
          >
            <Typography variant='body2' color='text.secondary'>
              <Skeleton height={20} />
              <Skeleton height={20} />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
export default TopRatedMatchupCardSkeleton;
