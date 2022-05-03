import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import './App.css'
import React, { useEffect, useState, createContext } from 'react';
import config from './config'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Welcome from './pages/Welcome'
import Event from './pages/Event'
import Teams from './pages/Teams'
import Tasks from './pages/Tasks'
import Attacks from './pages/Attacks'
import Report from './pages/Report'
import EventSettings from './pages/EventSettings'
import { makeTestEvents, makeTestUsers, makeTestAttacks, makeTestTeams } from './generateTestData'


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

export const StateContext = createContext(null);

function App() {
  const [events, setEvents] = useState(makeTestEvents(10))
  const [users, setUsers] = useState(makeTestUsers(10))
  const [attacks, setAttacks] = useState(makeTestAttacks(10))
  const [teams, setTeams] = useState(makeTestTeams(10))

  const [currentEvent, setCurrentEvent] = useState();

  const stateContextValues = {
    events, setEvents,
    users, setUsers,
    attacks, setAttacks,
    teams, setTeams,
    currentEvent, setCurrentEvent
  }

  useEffect(() => {
    let path = window.location.pathname
    let id = Number.parseInt(path.split('/events/')[1])
    if (id) {
      setCurrentEvent(events.find(event => event.id === id))
    }
  }, []);


  return (
    <div className='app'>
      <StateContext.Provider value={stateContextValues}>
        <Header />
        <div className='main-page' id='main-page'>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/events/:id' element={<Event />} />
            <Route path='/events/:id/teams' element={<Teams />} />
            <Route path='/events/:id/tasks' element={<Tasks />} />
            <Route path='/events/:id/attacks' element={<Attacks />} />
            <Route path='/events/:id/report' element={<Report />} />
            <Route path='/events/:id/settings' element={<EventSettings />} />
          </Routes>
        </div>

      </StateContext.Provider>
    </div>
  );
}

export default App;
