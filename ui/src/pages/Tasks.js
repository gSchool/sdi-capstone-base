import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/Tasks.css'

const Tasks = () => {
  const state = useContext(StateContext)

  return (
    <div className='tasks'>
      Tasks
    </div>
  )
}

export default Tasks;