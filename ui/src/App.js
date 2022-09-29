import React, {useState, useEffect} from 'react'
import Home from './Components/Home.js'
import { MemberDetails } from './Components/MembersDetail.js';
// import {Navbar} from './Components/Navbar.js'
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import { MemberContext } from './Components/MemberContext.js';
import  PersistentDrawerLeft from './Components/Navbar.jsx'
import { FlightStatus } from './Components/FlightStatus.js';
// import Home from './Components/Home';

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/users', {
    method: 'GET',
    
    })
    .then (res => res.json())
    .then (data => setData(data))
    .catch (err => console.log(err))
    
  }, []);

    const obj = {
      // value: [data, setData]
      data,
      setData
      
    }

  return (
   
    <MemberContext.Provider value={obj}>
      <Router>
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sfmembers" element={<MemberDetails />} />
          <Route path="/flightstatus" element={<FlightStatus />} />
        </Routes>
      </Router>
    </MemberContext.Provider>

  )
}


export default App;
