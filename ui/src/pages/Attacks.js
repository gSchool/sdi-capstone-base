import React, { useContext } from 'react'
import { StateContext } from '../App.js'


const Attacks = () => {
  const state = useContext(StateContext)

  return (
    <div className='attack'>
    Attacks
    </div>
  )
}

export default Attacks;