import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { School } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/reduxHooks';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const UnStyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Box component={UnStyledLink} to='/'>
          <Typography variant='h5'>
            <School sx={{ mr: 1 }} />
            404
          </Typography>
        </Box>
        <UserBox
          onClick={() => setOpenMenu(true)}
          id='user-box'
          sx={{ cursor: 'pointer' }}
        >
          {/*Informations will be replaced by user data */}
          <Avatar src='https://i.pravatar.cc/' />
          <Typography variant='body1'>John Doe</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='user-box'
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={UnStyledLink} to='/profile'>
          Profile
        </MenuItem>
        <MenuItem component={UnStyledLink} to='/logout'>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
