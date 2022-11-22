import MenuButton from "./MenuButton";

import { NavLink } from "react-router-dom";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  styled,
  Typography,
  ListItem,
} from "@mui/material";
import {
  Home,
  Logout,
  ModeNight,
  SportsMma,
  SportsKabaddi,
} from "@mui/icons-material";

import { useAppSelector } from "../../hooks/reduxHooks";
import ColorThemeToggle from "../ColorThemeToggle/ColorThemeToggle";

export const UnStyledLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const SidebarWrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  position: "absolute",
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  height: "100%",
  padding: "1rem 3rem 1rem 2rem",
  background: theme.palette.background.paper,
  overflowY: "auto",
}));

const ListItemContrastText = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Sidebar = () => {
  const authState = useAppSelector((state) => state.authReducer);

  return (
    <SidebarWrapper flex={1}>
      <SidebarContainer>
        <List>
          <ListItemContrastText>
            <Box component={UnStyledLink} to='/'>
              <Typography
                sx={{
                  display: "flex",
                  fontSize: "1.3em",
                  fontWeight: "700",
                  letterSpacing: "3px",
                }}
                variant='h5'
                alignItems='center'
              >
                <SportsMma color='primary' sx={{ mr: 1 }} />
                UFC Vote
              </Typography>
            </Box>
          </ListItemContrastText>
          <Divider light />

          <ListItemContrastText disablePadding>
            <ListItemButton>
              <UserBox id='user-box'>
                <Typography variant='body1'>
                  {authState.currentUser?.username}
                </Typography>
              </UserBox>
            </ListItemButton>
          </ListItemContrastText>
          <MenuButton text={"Logout"} url='/logout'>
            <Logout color='secondary' />
          </MenuButton>
          <Divider light />
          <MenuButton text={"Home"} url='/'>
            <Home color='secondary' />
          </MenuButton>
          <MenuButton text={"Vote"} url='/voting/Bantamweight'>
            <SportsKabaddi color='secondary' />
          </MenuButton>

          <Divider light />
          <ListItemContrastText disablePadding>
            <ListItemButton component='a' href='#'>
              <ListItemIcon>
                <ModeNight color='secondary' />
              </ListItemIcon>
              <ColorThemeToggle />
            </ListItemButton>
          </ListItemContrastText>
        </List>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;
