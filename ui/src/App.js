import React, { useEffect, useState} from 'react';
import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  
  const userId = 1 //change these to match the actual logged in user
  const isAdmin = false

  return (
    <div>
      {
        isAdmin ? 

          <Router>
            <Header/>
              <Routes>
                <Route path = '/tasks' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/:user' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/add' element ={<AddPage type = {"task"}/>}> </Route>
                <Route path = '/tasks/details/:task' element ={<TaskDetails/>}> </Route>
                <Route path = '/tasks/weekly' element ={<TaskTable/>}> </Route>
                <Route path = '/tasks/weekly/:user' element ={<TaskTable/>}> </Route>
                <Route path = '/profile' element ={<Profile/>}> </Route>
                <Route path = '/menu' element ={<AdminMenu/>}> </Route>
                <Route path = '/allO' element ={<Profile/>}> </Route>
                <Route path = '/*' element = {<Posts user = {false}/>}></Route>
              </Routes>
          </Router>
        :

        userId !== null ?
            <Router>
            <Header/>
              <Routes>
                <Route path = '/tasks' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/:user' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/add' element ={<AddPage type = {"task"}/>}> </Route>
                <Route path = '/tasks/details/:task' element ={<TaskDetails/>}> </Route>
                <Route path = '/tasks/weekly' element ={<TaskTable/>}> </Route>
                <Route path = '/tasks/weekly/:user' element ={<TaskTable/>}> </Route>
                <Route path = '/profile' element ={<Profile/>}> </Route>
                <Route path = '/*' element = {<Posts user = {false}/>}></Route>
              </Routes>
          </Router>

          :

          <Router>
            <Header/>
            <Routes>
                <Route path = '/' element ={<SignUp/>}> </Route>
                <Route path = '/login' element ={<Login/>}> </Route>
                <Route path = '/*' element = {<Login/>}></Route>
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;
