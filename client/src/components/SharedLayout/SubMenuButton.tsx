import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

function SubMenuButton({ text, url }: { text: string; url: string }) {
  const { pathname } = useLocation();

  return (
    <Button
      component={NavLink}
      to={url}
      variant='contained'
      color={pathname === url ? "primary" : "neutral"}
      sx={{
        padding: "1.7em",
        fontWeight: "600",
      }}
    >
      {text}
    </Button>
  );
}
export default SubMenuButton;
