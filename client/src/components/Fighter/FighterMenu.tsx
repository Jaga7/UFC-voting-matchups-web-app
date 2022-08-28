import { useTheme } from "@mui/material";
import { Box, ButtonGroup } from "@mui/material";
import SubMenuButton from "../SharedLayout/SubMenuButton";
function FighterMenu() {
  const theme = useTheme();
  return (
    <Box
      borderRadius='5px'
      width={"100%"}
      marginBottom='2em'
      display='flex'
      bgcolor={theme.palette.action.selected}
      position='sticky'
      top='1em'
      zIndex='999'
    >
      <ButtonGroup fullWidth>
        <SubMenuButton text='All' url='/fighters/' />
        <SubMenuButton text='Bantamweight' url='/fighters/Bantamweight' />
        <SubMenuButton text='Lightweight' url='/fighters/Lightweight' />
      </ButtonGroup>
    </Box>
  );
}
export default FighterMenu;
