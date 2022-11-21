import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useServiceConfig,
  authenticate,
  ServiceConfig,
  Athlete,
} from "@akinsgre/kayak-strava-utility";
import Button from "@mui/material/Button";
import { navigateToUrl } from "single-spa";

export interface PostProps {
  setUser: (token: any) => void;
  setUserActivities: (token: any) => void;
}

export default function StravaRedirect(postProps: PostProps) {
  let clientId: string;
  let secret: string;
  let redirectUrl: string;
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const effectUser = async () => {
      //ToDO let's fix the useServiceConfig to use a different name
      /*eslint-disable */
      const config: ServiceConfig = await useServiceConfig();
      console.log("Is config set", config);
      clientId = config.clientId;
      secret = config.clientSecret;
      redirectUrl = config.redirectUrl;
      const userData: Athlete = await authenticate(
        config.clientId,
        config.clientSecret
      );
      if (userData) {
        setUserName(`${userData.firstname} ${userData.lastname}`);
      }
    };
    effectUser();
  }, [location.pathname, navigate]);

  const handleAuthClick = () => {
    if (clientId) {
      const loginUrl = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&approval_prompt=force&scope=activity:read_all&redirect_uri=${redirectUrl}/exchange_token`;
      navigateToUrl(loginUrl);
    }
  };

  return (
    <Button color="inherit" onClick={handleAuthClick}>
      {userName || "Signup"}
    </Button>
  );
}
