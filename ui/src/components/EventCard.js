import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/EventCard.css'
import { useNavigate } from 'react-router-dom'

const EventCard = ({ event, add }) => {
  const state = useContext(StateContext)
  const navigate = useNavigate()

  const onAdd = () => {
    console.log("Add event");
    const eventsCopy = [...state.events]
    eventsCopy.push({
      name: `System ${state.events.length + 1} CTT`,
      id: state.events.length + 1
    });
    state.setEvents(eventsCopy);

  }

  const onClickEvent = () => {
    console.log(event)
    state.setCurrentEvent(event)
    navigate(`/events/${event.id}`)
  }

  const clickHandler = add ? onAdd : onClickEvent

  return (
    <div className={`event-card ${add ?? ''}`} onClick={clickHandler}>
      {event.name}
    </div>
  )
}

export default EventCard;