import { Box } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Header from "../../../components/Header/Header";
import TopRatedMatchupCard from "../../../components/TopRatedMatchup/TopRatedMatchupCard";
import { useGetFightersByIdsQuery } from "../../../services/fighters-service";
import { useGetMatchupsQuery } from "../../../services/matchups-service";

const Home = () => {
  const { data: topMatchups, isSuccess: areMatchupsFetched } =
    useGetMatchupsQuery({
      getTopVoted: true,
    });

  const {
    data: fightersFromTopMatchups,
    isSuccess: fightersFromTopMatchupsAreFetched,
  } = useGetFightersByIdsQuery(
    areMatchupsFetched
      ? topMatchups!.reduce(
          (ids, currentMatchup) => [
            ...ids,
            ...currentMatchup!.matched_fighters!,
          ],
          [] as string[]
        )
      : skipToken
  );

  const topMatchupsWithFighters = fightersFromTopMatchupsAreFetched
    ? topMatchups!.map((matchup) => ({
        ...matchup,
        matched_fighters: matchup.matched_fighters.map((fighterId) =>
          fightersFromTopMatchups.response.find(
            (fighter) => fighter._id === fighterId
          )
        ),
      }))
    : null;

  return (
    <>
      <Header subheader={false} title='Top-Voted Matchups' />
      <Box
        display={"grid"}
        gridTemplateColumns={`repeat(2, 1fr)`}
        width='90%'
        columnGap='3em'
        rowGap='1.5em'
      >
        {topMatchupsWithFighters &&
          topMatchupsWithFighters.map((matchupWithFighters) => {
            return (
              <TopRatedMatchupCard matchupWithFighters={matchupWithFighters} />
            );
          })}
      </Box>
    </>
  );
};
export default Home;
