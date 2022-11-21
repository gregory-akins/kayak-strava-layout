import { Navbar } from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StravaRedirect from "./StravaRedirect";

export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navbar />} />
      </Routes>
    </Router>
  );
}
