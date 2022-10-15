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
        <SubMenuButton text='All' url='/fighters/all' />
        <SubMenuButton text='Flyweight' url='/fighters/Flyweight' />
        <SubMenuButton text='Bantamweight' url='/fighters/Bantamweight' />
        <SubMenuButton text='Featherweight' url='/fighters/Featherweight' />
        <SubMenuButton text='Lightweight' url='/fighters/Lightweight' />
        <SubMenuButton text='Welterweight' url='/fighters/Welterweight' />
        <SubMenuButton text='Middleweight' url='/fighters/Middleweight' />
        <SubMenuButton
          text='LightHeavyweight'
          url='/fighters/LightHeavyweight'
        />
        <SubMenuButton text='Heavyweight' url='/fighters/Heavyweight' />
        <SubMenuButton
          text='womenStrawweight'
          url='/fighters/womenStrawweight'
        />
        <SubMenuButton text='womenFlyweight' url='/fighters/womenFlyweight' />
        <SubMenuButton
          text='womenBantamweight'
          url='/fighters/womenBantamweight'
        />
      </ButtonGroup>
    </Box>
  );
}
export default FighterMenu;
