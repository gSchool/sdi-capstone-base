import React, { useEffect, useState } from 'react';
import config from './config'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CrewProfile from './pages/CrewProfile';
import LeaderProfile from './pages/LeaderProfile';
import Signup from './pages/Signup';
import Splash from './pages/Splash';


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  let [autehnticatedUser, setAuthenticatedUser] = useState({});

  useEffect(() => {
    // fetch(ApiUrl + '/data')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data)
    //   })
  }, [])


  return (
    <div className='App'>
      <Context.Provider value={{ autehnticatedUser, setAuthenticatedUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/crewProfile" element={<CrewProfile />} />
            <Route path="/leaderProfile" element={<LeaderProfile />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>

  );
}

export default App;

export const Context = React.createContext();
