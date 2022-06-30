import React, { useContext } from 'react'
import { GlobalContext } from '../_context/AppProvider'
import { Fix, Img } from '../_styles/_global'

const ThemeSwitch = () => {

  const { store } = useContext(GlobalContext)
  const { theme, toggleTheme } = store

  return (
    <Fix className="pointer">
      {theme === 'lite' &&
        <Img small alt='' src='/assets/img/moon.png' onClick={()=>{toggleTheme()}}/>
      }
      {theme === 'dark' &&
        <Img small alt='' src='/assets/img/sun.png' onClick={()=>{toggleTheme()}}/>
      }
    </Fix>
  )
}

export default ThemeSwitch