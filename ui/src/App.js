import Home from "./Components/Home";
import Footer from "./Components/Footer";
import AssetView from "./Components/AssetView";
import Approver from "./Components/Approver";
import LoginPage from "./Components/LoginPage";
import Requests from "./Components/Requests";
import ShoppingCart from "./Components/ShoppingCart";
import SME from "./Components/SME";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Context from "./Context";

function App() {
  const [authentication, setAuthentication] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={{ authentication, setAuthentication }}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Approver" element={<Approver />} />
            <Route path="/Assets/:id" element={<AssetView />} />
            <Route path="/Requests" element={<Requests />} />
            <Route path="/SME/:id" element={<SME />} />
          </Routes>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
