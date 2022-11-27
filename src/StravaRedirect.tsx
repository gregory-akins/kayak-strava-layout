import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useServiceConfig,
  authenticate,
  ServiceConfig,
  Athlete,
  Token,
} from "@akinsgre/kayak-strava-utility";
import Button from "@mui/material/Button";
import { navigateToUrl } from "single-spa";
import Cookies from "js-cookie";

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

      // see if we have a access_token that works

      const token: Token = JSON.parse(Cookies.get("token")) as Token;

      let userData: Athlete;
      //Checking if token isn't defined, current date is past the expiry date
      if (token === undefined || token.expiry < Math.floor(Date.now() / 1000)) {
        userData = await authenticate(config.clientId, config.clientSecret);
      } else {
        console.log("don't authenticate, just get the athlete", token);
        userData = {
          firstname: token.athlete.firstname,
          lastname: token.athlete.lastname,
        } as Athlete;
      }
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
      {userName || "Authorize Strava"}
    </Button>
  );
}
