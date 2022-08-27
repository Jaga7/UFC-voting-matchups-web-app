import { Box, Stack } from "@mui/material";
import MainContent from "../../../components/SharedLayout/MainContent";
// import Sidebar from "../../components/SharedLayout/Sidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SharedLayout/Sidebar";
const SharedLayout = () => {
  return (
    <Box>
      <Stack direction='row' spacing={4}>
        <Sidebar />
        {/* <Navbar /> */}
        <MainContent>
          <Outlet />
        </MainContent>
      </Stack>
    </Box>
  );
};
export default SharedLayout;
