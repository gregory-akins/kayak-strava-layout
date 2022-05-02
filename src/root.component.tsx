import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StravaRedirect from "./StravaRedirect";
import { cleanUpAuthToken } from "./utils/functions";

export default function Root(props) {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/redirect" component={StravaRedirect} />
        </Switch>
      </div>
    </Router>
  );
}
