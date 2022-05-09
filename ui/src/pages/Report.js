import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/Report.css'

const Report = () => {
  const state = useContext(StateContext)

  return (
    <div className='report'>
      Report
    </div>
  )
}

export default Report;