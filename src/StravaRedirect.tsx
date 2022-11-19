import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useServiceConfig, authenticate } from "@akinsgre/kayak-strava-utility";

export interface PostProps {
  setUser: (token: any) => void;
  setUserActivities: (token: any) => void;
}

export default function StravaRedirect() {
  let clientId: string;
  let secret: string;
  const navigate = useNavigate();
  const location = useLocation();
  const fetchData = async () => {
    const data = await authenticate(location.pathname, clientId, secret);
  };
  useEffect(() => {
    (async () => {
      //ToDO let's fix the useServiceConfig to use a different name
      /*eslint-disable */
      useServiceConfig()
        .then((value) => {
          clientId = value.clientId;
          secret = value.clientSecret;
        })
        .then(async (value) => {
          await fetchData().catch(console.error);
        });
      /*eslint-enable */
    })();
  }, [location.pathname, navigate]);

  return <div></div>;
}
