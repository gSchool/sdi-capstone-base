import React, { useState, useEffect, useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/EventSettings.css'

const EventSettings = () => {
  const state = useContext(StateContext)

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const submitHandler = (event) => {
    event.preventDefault()
    if (window.confirm("Are you sure you want to make these changes?")) {
      console.log(`Submitted changes for event: ${state.currentEvent.name}`)
    }
  }

  useEffect(() => {
    if (state.currentEvent) {
      setStartDate(new Date(state.currentEvent.start_date))
      setEndDate(new Date(state.currentEvent.end_date))
    }
  }, [state])

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to permanently delete this event?")) {
      console.log(`Deleted event: ${state.currentEvent.name}`)
    }
  }

  return (
    <>
      {state.currentEvent ?
        <div className='event'>
          <h1>Settings for {state.currentEvent.name}</h1>

          <form onSubmit={submitHandler}>
            <div className='info'>
              <div className='info-labels'>
                <div className='entry'>Start:</div>
                <div className='entry'>End:</div>
              </div>
              <div className='info-values'>
                <input type='date' name='start_date' id='start_date' defaultValue={startDate ? `${startDate.getFullYear()}-${`${startDate.getMonth() + 1}`.padStart(2, '0')}-${`${startDate.getDay() + 1}`.padStart(2, '0')}` : ''} />
                <input type='date' name='end_date' id='end_date' defaultValue={endDate ? `${endDate.getFullYear()}-${`${endDate.getMonth() + 1}`.padStart(2, '0')}-${`${endDate.getDay() + 1}`.padStart(2, '0')}` : ''} />
              </div>
            </div>

            <div className='info'>
              <div className='info-labels desc'>
                <div>Description:</div>
              </div>
              <div className='info-values desc desc-val'>
                <textarea name='description' id='description' defaultValue={state.currentEvent.description} />
              </div>
            </div>
            <input className='button submit' type='submit' value='Save Changes' />
          </form>

          <hr className='rule'/>
          <div className='danger-zone' >
            <h1>Danger Zone</h1>
            <button className='button delete' type='button' onClick={deleteHandler}>
              Delete Event
            </button>
          </div>


        </div> : <></>
      }
    </>
  )
}

export default EventSettings;