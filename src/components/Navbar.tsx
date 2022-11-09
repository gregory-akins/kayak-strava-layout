import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { navigateToUrl } from "single-spa";
import { useServiceConfig } from "@akinsgre/kayak-strava-utility";

export const Navbar = () => {
  let clientId = "";
  let redirectUrl: string = "";
  useServiceConfig().then((value) => {
    clientId = value.clientId;
    redirectUrl = value.redirectUrl;
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const handleLogin = () => {
    //TODO figure out how to use testAuthGetter from utility
    const loginUrl = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=activity:read_all`;
    navigateToUrl(loginUrl);
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
