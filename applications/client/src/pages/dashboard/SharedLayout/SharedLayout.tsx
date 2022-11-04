import { Box, Stack } from "@mui/material";
import MainContent from "../../../components/SharedLayout/MainContent";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SharedLayout/Sidebar";
const SharedLayout = () => {
  return (
    <Box>
      <Stack direction='row' spacing={4}>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </Stack>
    </Box>
  );
};
export default SharedLayout;
