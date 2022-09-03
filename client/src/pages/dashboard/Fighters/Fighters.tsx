import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFightersQuery } from "../../../services/fighters-service";

import Header from "../../../components/Header/Header";

import FighterCard from "../../../components/Fighter/FighterCard";
import FighterMenu from "../../../components/Fighter/FighterMenu";
import FighterSplitButton from "../../../components/Fighter/FighterSplitButton";
import { Box, Pagination, useMediaQuery } from "@mui/material";

import FighterCardSkeleton from "../../../components/Fighter/FighterCardSkeleton";
import { FighterT } from "../../../types/FighterT";

const FightersPage = () => {
  const matches = useMediaQuery("(min-width:960px)");

  const [page, setPage] = useState(1);
  const handlePaginationClick = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();
  const { weightclass } = useParams();

  const queryWeightclass =
    weightclass === "Flyweight"
      ? "Flyweight"
      : weightclass === "Bantamweight"
      ? "Bantamweight"
      : weightclass === "Featherweight"
      ? "Featherweight"
      : weightclass === "Lightweight"
      ? "Lightweight"
      : weightclass === "Welterweight"
      ? "Welterweight"
      : weightclass === "Middleweight"
      ? "Middleweight"
      : weightclass === "LightHeavyweight"
      ? "LightHeavyweight"
      : weightclass === "Heavyweight"
      ? "Heavyweight"
      : weightclass === "womenStrawweight"
      ? "womenStrawweight"
      : weightclass === "womenFlyweight"
      ? "womenFlyweight"
      : weightclass === "womenBantamweight"
      ? "womenBantamweight"
      : "all";

  const amountOfFightersPerPage = 10;
  const { data, refetch } = useGetFightersQuery({
    weightclass: queryWeightclass,
    // page: page,
    amount: amountOfFightersPerPage,
  });

  useEffect(() => {
    console.log("WEIGHTCLASS", weightclass);

    setPage(1);
  }, [weightclass, navigate]);

  return (
    <>
      <Header subheader={false} title='Fighters' />
      {/* <FighterMenu /> */}
      <FighterSplitButton />
      <Box
        display={"grid"}
        gridTemplateColumns={matches ? `repeat(2, 1fr)` : "repeat(1, 1fr)"}
        width='90%'
        columnGap='3em'
        rowGap='1.5em'
      >
        {data && data.response ? (
          data.response.fighters
            .slice(
              (page - 1) * amountOfFightersPerPage,
              page * amountOfFightersPerPage
            )
            .map((el: FighterT) => (
              <FighterCard
                key={el._id}
                fighter={el}
                opponents={data.response.fighters.filter(
                  (fighter) => fighter._id !== el._id
                )}
              ></FighterCard>
            ))
        ) : (
          <>
            <FighterCardSkeleton />
            <FighterCardSkeleton />
            <FighterCardSkeleton />
            <FighterCardSkeleton />
          </>
        )}
      </Box>
      <Box
        justifyContent={"center"}
        alignItems='center'
        display={"flex"}
        sx={{
          margin: "20px 0px",
        }}
      >
        {data && data.response && (
          <Pagination
            defaultPage={1}
            count={Math.ceil(data.response.numOfPages)}
            disabled={Math.ceil(data.response.numOfPages) < 2}
            onChange={handlePaginationClick}
          />
        )}
      </Box>
    </>
  );
};
export default FightersPage;
