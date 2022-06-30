import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing.js';
import SignUp from './Components/SignUp.js';
import Profile from './Components/Profile.js';
import { AppProvider } from './AppContext.js';

// import config from './config'
// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {

  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
