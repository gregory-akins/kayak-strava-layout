import { useState, useEffect } from "react";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

import { fromEvent } from "rxjs";

import { setUser, setUserActivities } from "./actions";
import {
  cleanUpAuthToken,
  testAuthGetter,
  getUserData,
} from "./utils/functions";

export interface PostProps {
  setUser: (token: any) => void;
  setUserActivities: (token: any) => void;
}
export default function StravaRedirect(props: PostProps) {
  const [state, setState] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const authenticate = async () => {
      try {
        // If not redirected to Strava, return to home

        if (_.isEmpty(location)) {
          return navigate("/");
        }

        // Save the Auth Token to the Store (it's located under 'search' for some reason)
        const stravaAuthToken = cleanUpAuthToken(location.search);

        // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
        const tokens = await testAuthGetter(stravaAuthToken);
        props.setUser(tokens);
        const accessToken = tokens.access_token;
        const userID = tokens.athlete.id;
        localStorage.setItem("athlete", tokens.athlete.username);
        // Axios request to get users info
        const user = await getUserData(userID, accessToken);
        props.setUserActivities(user);

        // Once complete, go to display page
        navigate("/yourdistance");
      } catch (error) {
        navigate("/");
      }
    };
    authenticate();
  }, []);
  return <div>Loading</div>;
}

const mapStateToProps = (state) => {
  return { authTokenURL: state.authTokenURL };
};
