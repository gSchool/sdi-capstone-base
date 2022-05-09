import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import EventCard from '../components/EventCard'
import './styles/Welcome.css'

const Welcome = () => {
  const state = useContext(StateContext)

  return (
    <div className='welcome-wrapper'>
      <div className='filter-buttons'>
        <button className='button'>All Events</button>
        <button className='button'>Past Events</button>
        <button className='button'>Upcoming Events</button>
      </div>
      <div className='welcome'>
        <EventCard event={{name: '+'}} add='add'/>
        {state.events.map(event => <EventCard key={event.name} event={event}/>)}
      </div>
    </div>
  )
}

export default Welcome;