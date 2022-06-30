import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing.js';
import SignUp from './Components/SignUp.js';
import Profile from './Components/Profile.js';
import { AppProvider } from './AppContext.js';

// import config from './config'
// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {

  // let [list, setList] = useState([ ]);

  // useEffect(() => {
  //   fetch('http://localhost:8082/users')
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  //     .catch(err => console.log(err))
  // }, []);

  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
      </Routes>
    </Router>
    {/* <div>
      <h4>{list.map(post => post.title)}</h4>
      <p>{list.map(post => post.content)}</p>
    </div> */}
    </AppProvider>
  );
}

export default App;
