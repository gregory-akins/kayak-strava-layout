import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import StravaRedirect from "../StravaRedirect";

export const Navbar = () => {
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
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          Paddle Strava
        </Typography>

        <StravaRedirect setUser={undefined} setUserActivities={undefined} />
      </Toolbar>
    </AppBar>
  );
};
