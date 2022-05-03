import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/Event.css'

const Event = () => {
  const state = useContext(StateContext)

  return (
    <>
      {state.currentEvent ?
        <div className='event'>
          <h1>{state.currentEvent.name}</h1>

          <div className='info'>
            <div className='info-labels'>
              <div className='entry'>Start:</div>
              <div className='entry'>End:</div>
              <div className='entry'>Attacks:</div>
              <div className='entry'>Participants:</div>
            </div>
            <div className='info-values'>
              <div className='entry'>{state.currentEvent.start_date || <>&nbsp;</>}</div>
              <div className='entry'>{state.currentEvent.end_date || <>&nbsp;</>}</div>
              <div className='entry'>{state.attacks?.length || <>&nbsp;</>}</div>
              <div className='entry'>{state.users?.length || <>&nbsp;</>}</div>
            </div>
          </div>

          <div className='info'>
            <div className='info-labels desc'>
              <div>Description:</div>
            </div>
            <div className='info-values info-values desc-val'>
              <div>{state.currentEvent.description || <>&nbsp;</>}</div>
            </div>
          </div>

        </div> : <></>
      }
    </>
  )
}

export default Event;