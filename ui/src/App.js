import React, {useState, useEffect} from 'react'
import Home from './Components/Home.js'
import { MemberDetails } from './Components/MembersDetail.js';
// import {Navbar} from './Components/Navbar.js'
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import { MemberContext } from './Components/MemberContext.js';
import  PersistentDrawerLeft from './Components/Navbar.jsx'
import { FlightStatus } from './Components/FlightStatus.js';
import Schedule from './Components/Schedule.js';
import InvdivdualMember from './Components/InvidualMember.js';
// import Home from './Components/Home';


const App = () => {
  const [data, setData] = useState();
  const [member, setMember] = useState();
  const [user, setUser] = useState();
  const [API, setAPI] = useState("http://localhost:8080");

  useEffect(() => {
    fetch(`${API}/users`, {
    method: 'GET',
    })
    .then (res => res.json())
    .then (data => setData(data))
    .catch (err => console.log(err))
    
  }, [API]);

    const obj = {
      data,
      setData,
      member,
      setMember,
      user, 
      setUser,
      API, 
      setAPI,
    }

  return (
    <MemberContext.Provider value={obj}>
      <Router>
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sfmembers" element={<MemberDetails />} />
          <Route path="/flightstatus" element={<FlightStatus />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/sfmembers/:memberId" element={<InvdivdualMember />} />
        </Routes>
      </Router>
    </MemberContext.Provider>

  )
}


export default App;
