import React, { useContext } from 'react'
import { StateContext } from '../App.js'
import './styles/Attacks.css'


const Attacks = () => {
  const state = useContext(StateContext)

  return (
    <div className='attacks'>
      Attacks
    </div>
  )
}

export default Attacks;