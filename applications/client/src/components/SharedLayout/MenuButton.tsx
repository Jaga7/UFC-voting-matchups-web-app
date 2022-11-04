import { NavLink, useLocation } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  ListItem,
} from "@mui/material";
import { ReactNode } from "react";

const ListItemContrastText = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

function MenuButton({
  text,
  children,
  url,
}: {
  text: string;
  children: ReactNode;
  url: string;
}) {
  const { pathname } = useLocation();

  return (
    <ListItemContrastText disablePadding>
      <ListItemButton
        component={NavLink}
        to={url}
        selected={
          pathname === url || pathname.split("/")[1] === url.split("/")[1] // FOR SUBNAVIGATION WHERE URL CHANGES, TAKE FROM URL AND PATHNAME /[this]/* AND COMPARE
        }
      >
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItemContrastText>
  );
}
export default MenuButton;
