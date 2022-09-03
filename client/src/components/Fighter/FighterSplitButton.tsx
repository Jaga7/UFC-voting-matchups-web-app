import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const options = [
  "Flyweight",
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "LightHeavyweight",
  "Heavyweight",
  "womenStrawweight",
  "womenFlyweight",
  "womenBantamweight",
];

export default function SplitButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    navigate(`/fighters/${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    navigate(`/fighters/${options[index]}`);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
        sx={{ marginBottom: "1.5em" }}
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size='small'
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Item>1</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>2</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>3</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>4</Item>
                  </Grid>
                </Grid> */}
                <MenuList id='split-button-menu' autoFocusItem>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      {/* <Item>1</Item> */}
                      {options.slice(0, 8).map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Item>1</Item> */}
                      {options.slice(8).map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index + 8 === selectedIndex}
                          onClick={(event) =>
                            handleMenuItemClick(event, index + 8)
                          }
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Grid>
                  </Grid>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
