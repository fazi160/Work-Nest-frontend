import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
const isLargeScreen = () => {
  return window.innerWidth >= 1280;
};

const TOP_NAV_HEIGHT = 54;

const Navbar = ({ onNavOpen }) => {
  const lgUp = isLargeScreen();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout actions here
    localStorage.removeItem("token");
    navigate("/admin/login");
    handleMenuClose();
  };

  return (
    <AppBar
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: TOP_NAV_HEIGHT,
          padding: (theme) => theme.spacing(2),
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {!lgUp && (
            <IconButton
              onClick={onNavOpen}
              sx={{
                fontSize: "small",
              }}
            >
              <SvgIcon fontSize="small">
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          )}
          <Tooltip title="Search">
            <IconButton
              sx={{
                fontSize: "small",
              }}
            >
              <SvgIcon fontSize="small">
                <SearchIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Tooltip title="Contacts">
            <IconButton
              onClick={handleAvatarClick}
              sx={{
                fontSize: "small",
              }}
            >
              <SvgIcon fontSize="small">
                <PeopleIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleAvatarClick}
              sx={{
                fontSize: "small",
              }}
            >
              <Badge badgeContent={4} color="primary" variant="dot">
                <SvgIcon fontSize="small">
                  <NotificationsIcon />
                </SvgIcon>
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            src="/assets/avatars/avatar-anika-visser.png"
            onClick={handleAvatarClick}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
