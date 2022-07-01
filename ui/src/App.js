import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing.js';
import SignUp from './Components/SignUp.js';
import Profile from './Components/Profile.js';
import { AppProvider } from './AppContext.js';
import PublicPosts from './Components/PublicPosts.js';
import IndvPubPosts from './Components/IndvPubPosts.js';
import PrivPost from './Components/PrivPost.js';

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
        <Route path='/publicfeed' element={<PublicPosts/>}/>
        <Route path='/publicfeed/:id' element={<IndvPubPosts/>}/>
        <Route path='/profile/:username/:post' element={<PrivPost/>}/>
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
