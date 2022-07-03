import React, { useContext } from 'react'
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import { ReactComponent as Moon } from '../_assets/icons/moon.svg';
import { ReactComponent as Sun } from '../_assets/icons/sun.svg';

const ThemeSwitcher = () => {

  const { store } = useContext(GlobalContext)
  const { globalState, toggleTheme } = store
  const { theme } = globalState

  return (
    <Div flex centerchildren className="sidebar-footer-theme pointer">
      {theme === 'dark' &&
        <Moon className="moon" alt='dark mode' onClick={()=>{toggleTheme()}} />
      }
      {(theme === 'lite' || theme === 'null') &&
        <Sun className="sun" alt='lite mode' onClick={()=>{toggleTheme()}} />
      }
    </Div>
  )
}

export default ThemeSwitcher