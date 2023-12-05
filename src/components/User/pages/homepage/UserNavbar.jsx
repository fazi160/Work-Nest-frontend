import React from 'react';
import { AppBar, Toolbar, Typography, Container, Link, MenuItem as MuiMenuItem, Menu as MuiMenu } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import UserChat from '../UserChat';

const Navbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'black',
}));

const Logo = styled('img')({
  marginRight: '16px',
  width: '50px',
  height: '50px',
  position: 'absolute',
  top: '10px',
  left: '-140px',
});

const Menu = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  marginLeft: 'auto',
});

const MenuItem = styled(MuiMenuItem)({
  margin: '0 16px',
});

const LogoutLink = styled(Link)({
  cursor: 'pointer',
});

function UserNavbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user/login');
  };

  const loginOrLogoutHandle = () => {
    const token = localStorage.getItem('token');

    if (token) {
      return (
        <>
          <Link href="#" onClick={handleMenuOpen}>
            Welcome, User
          </Link>
          <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem>
              <Link href="/user/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <LogoutLink component="button" onClick={handleLogout}>
                Logout
              </LogoutLink>
            </MenuItem>
          </MuiMenu>
        </>
      );
    } else {
      return <Link href="/user/login">Login</Link>;
    }
  };

  return (
    <Navbar position="static">
      <Container>
        <Toolbar>
          <Logo src="/src/assets/logo.png" alt="Logo" />
          <Typography variant="h6">Welcome to Work Nest</Typography>
          <Menu>
            <MenuItem>
              <Link href="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/about">About</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/user/chat">Chat</Link>
            </MenuItem>
            <MenuItem>{loginOrLogoutHandle()}</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
