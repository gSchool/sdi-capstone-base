import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing.js';
import SignUp from './Components/SignUp.js';
import Profile from './Components/Profile.js';
import { AppProvider } from './AppContext.js';
import PublicPosts from './Components/PublicPosts.js';
import IndvPubPosts from './Components/IndvPubPosts.js';
import PrivPost from './Components/PrivPost.js';
import MyPost from './Components/MyPost.js';
import CreatePost from './Components/CreatePost.js';

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
        <Route path='/profile/:username/edit/:post' element={<PrivPost/>}/>
        <Route path='/profile/:username/:post' element={<MyPost/>}/>
        <Route path='/profile/:username/create' element={<CreatePost/>}/>
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
