import React from 'react';
import { AppBar, Toolbar, Typography, Container, Link } from '@mui/material';
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
  position: 'absolute', // Set the logo to absolute positioning
  top: '10px', // Adjust the top positioning as needed
  left: '-140px', // Adjust the left positioning as needed

});

const Menu = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  marginLeft: 'auto',
});

const MenuItem = styled('li')({
  margin: '0 16px',
});

function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user/login');
  };

  const loginOrLogoutHandle = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return <Link component="button" onClick={handleLogout}>Logout</Link>;
      
      
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
