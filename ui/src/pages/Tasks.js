import React, { useContext } from 'react'
import { StateContext } from '../App.js'

const Tasks = () => {
  const state = useContext(StateContext)

  return (
    <>
    Tasks
    </>
  )
}

export default Tasks;