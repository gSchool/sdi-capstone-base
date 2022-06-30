import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useToggleTheme from './effects/useToggleTheme'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { theme, toggleTheme } = useToggleTheme();
  const { refresh } = useRefresh();

  const store = {

    /* STATES */
    globalState,
    theme,

    /* SETTERS */
    setGlobalState,
    
    /* EFFECTS */
    refresh,
    toggleTheme,

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };