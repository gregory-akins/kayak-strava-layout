import React, { useState, useEffect } from "react";
import _ from "lodash";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";

import { setUser, setUserActivities } from "./actions";
import {
  cleanUpAuthToken,
  testAuthGetter,
  getUserData,
} from "./utils/functions";

export interface PostProps {
  setUser: (token: any) => void;
}
export default function StravaRedirect(props) {
  const [state, setState] = useState([]);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const authenticate = async () => {
      try {
        // If not redirected to Strava, return to home

        if (_.isEmpty(location)) {
          return history.push("/");
        }

        // Save the Auth Token to the Store (it's located under 'search' for some reason)
        const stravaAuthToken = cleanUpAuthToken(location.search);

        // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
        const tokens = await testAuthGetter(stravaAuthToken);
        this.props.setUser(tokens);
        const accessToken = tokens.access_token;
        //const userID = tokens.athlete.id;

        // Axios request to get users info
        // const user = await getUserData(userID, accessToken);
        // this.props.setUserActivities(user);

        // Once complete, go to display page
        history.push("/yourdistance");
      } catch (error) {
        history.push("/");
      }
    };
    authenticate();
  }, []);
  return <div>Loading</div>;
}

const mapStateToProps = (state) => {
  return { authTokenURL: state.authTokenURL };
};
