import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StravaRedirect from "./StravaRedirect";

export default function Root(props) {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<StravaRedirect />} />
      </Routes>
    </Router>
  );
}
