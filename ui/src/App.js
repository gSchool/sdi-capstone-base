import React, { useEffect, useState } from 'react';
import config from './config'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Splash2 from './pages/Splash2';
// import CrewProfile from './pages/CrewProfile';
// import LeaderProfile from './pages/LeaderProfile';
import Signup from './pages/Signup';
import Header from './components/Header';
import Calendar from './pages/calendar';
import Member from './pages/Member';
import './App.css'



const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  let [authenticatedUser, setAuthenticatedUser] = useState({});

  useEffect(() => {

  }, [])


  return (
    <div className='App'>
      <Context.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/member" element={<Member />} />
            <Route path="/splash" element={<Splash2 />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/crewProfile" element={<CrewProfile />} />
            <Route path="/leaderProfile" element={<LeaderProfile />} /> */}
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>

  );
}

export default App;

export const Context = React.createContext();
