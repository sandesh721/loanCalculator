import React, { useState, useContext } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Drawer, List, ListItem, ListItemText, Switch
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; 

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Exchange Rates(Live)", path: "/live" },
    { label: "Error page", path: "/error" },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          {/* Mobile menu icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  bgcolor: isActive(item.path) ? "primary.contrastText" : "transparent",
                  color: isActive(item.path) ? "primary.main" : "inherit",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                }}
                variant={isActive(item.path) ? "contained" : "text"}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Theme toggle switch on right */}
          <Switch
            checked={mode === "dark"}
            onChange={toggleTheme}
            color="default"
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            bgcolor: mode === "dark" ? "#000" : "#fff",
            color: mode === "dark" ? "#fff" : "inherit",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1">Theme</Typography>
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              color="default"
            />
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  bgcolor: isActive(item.path) ? "primary.main" : "transparent",
                  color: isActive(item.path) ? "#fff" : mode === "dark" ? "#fff" : "inherit",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                  borderRadius: 1,
                  mx: 1,
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
