import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import CreateTask from "./components/CreateTask.js";
import TaskDetails from "./components/TaskDetails.js";
import TaskTable from "./components/TaskTable.js";
import Profile from "./components/Profile.js";
import AdminMenu from "./components/AdminMenu.js";
import Header from "./components/Header.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import TaskCard from "./components/TaskCard.js";

const TaskContext = createContext(null);

function App() {
  const [userId, setUserId] = useState(1); //set this in Login (start as null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [userOrg, setUserOrg] = useState(1); //set this in Login (start as null)
  const [siteLoc, setSiteLoc] = useState("");

  const TaskContextValues = {
    userId,
    setUserId,
    isAdmin,
    setIsAdmin,
    userOrg,
    setUserOrg,
    siteLoc,
    setSiteLoc,
  };

  return (
    <div>
      <Router>
        <TaskContext.Provider value={TaskContextValues}>
          <Header />
          <Routes>
            <Route path="/tasks" element={<Dashboard user={false} />}>
              {" "}
            </Route>
            <Route
              path="/tasks/users/:user"
              element={<Dashboard user={false} />}
            >
              {" "}
            </Route>
            <Route path="/tasks/add" element={<CreateTask type={"task"} />}>
              {" "}
            </Route>
            <Route path="/tasks/:task" element={<TaskDetails />}>
              {" "}
            </Route>
            <Route path="/tasks/weekly" element={<TaskTable isArchive={false}/>}>
              {" "}
            </Route>
            <Route path="/profile" element={<Profile />}>
              {" "}
            </Route>
            <Route path="/archive" element={<TaskTable isArchive={true}/>}>
              {" "}
            </Route>
            <Route path="/register" element={<Register />}>
              {" "}
            </Route>
            <Route path="/login" element={<Login />}>
              {" "}
            </Route>
            <Route path="/*" element={<Dashboard user={false} />}></Route>
          </Routes>
        </TaskContext.Provider>
      </Router>
    </div>
  );
}

export { TaskContext, App };

/*
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
                <Route path = '/organizations' element ={<TaskTable/>}> </Route>
                <Route path = '/roles' element ={<TaskTable/>}> </Route>
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
                <Route path = '/*' element = {<Dashboard user = {false}/>}></Route>
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
*/
