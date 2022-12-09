import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header1"
import AssetView from "./views/AssetView";
import Approver from "./Components/Approver";
import LoginPage from "./Components/LoginPage";
// import Requests from "./Components/Requests";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Approver" element={<Approver />} />
          <Route path="/Assets/:type" element={<AssetView />} />
          <Route path="/Requests" element={<Requests />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;

