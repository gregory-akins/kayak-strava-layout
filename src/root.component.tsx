import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Switch } from "react-router";
import StravaRedirect from "./StravaRedirect";
import { cleanUpAuthToken } from "./utils/functions";
import { setUser, setUserActivities } from "./actions";
import { YourDistance } from "./components/YourDistance";

export default function Root(props) {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/redirect/*"
          element={
            <StravaRedirect
              setUser={setUser}
              setUserActivities={setUserActivities}
            />
          }
        />
        <Route path="/yourdistance" element={<YourDistance />} />
      </Routes>
    </Router>
  );
}
