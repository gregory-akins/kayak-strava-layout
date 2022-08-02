import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { authenticate } from "@akinsgre/kayak-strava-utility";

export interface PostProps {
  setUser: (token: any) => void;
  setUserActivities: (token: any) => void;
}

export default function StravaRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = authenticate(
      location.pathname,
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CLIENT_SECRET
    );
    navigate(path);
  }, [location.pathname, navigate]);
  return <div>Nothing here to see</div>;
}
