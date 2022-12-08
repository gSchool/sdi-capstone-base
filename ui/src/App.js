import Home from "./components/Home";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AssetView from './views/AssetView'
// import Approver from './Components/Approver';
// import LoginPage from './Components/LoginPage'
// import Requests from './Components/Requests';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Assets/:type" element={<AssetView />}/> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;

import "../App.css";
