import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { navigateToUrl } from "single-spa";

export const Navbar = () => {
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  const redirectUrl = "http://localhost:9000/redirect";
  const scope = "read";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const handleLogin = () => {
    navigateToUrl(
      `http://www.strava.com/oauth/authorize?client_id=58115&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Paddle Strava
        </Typography>
        <Button color="inherit" onClick={handleLogin}>
          {localStorage.getItem("username") || "Signup"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
