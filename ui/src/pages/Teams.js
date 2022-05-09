import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/Teams.css'

const Teams = () => {
  const state = useContext(StateContext)

  return (
    <div className='teams'>
      Teams
    </div>
  )
}

export default Teams;