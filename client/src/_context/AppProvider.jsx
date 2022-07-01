import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useIsAuth from './states/useIsAuth'
import useToggleTheme from './effects/useToggleTheme'
import useRefresh from './effects/useRefresh'
import useToken from './states/useToken'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { isAuth, setIsAuth } = useIsAuth();
  const { theme, toggleTheme } = useToggleTheme();
  const { refresh } = useRefresh();
  const { token, setToken } = useToken()

  const store = {

    /* STATES */
    globalState,
    theme,
    isAuth,
    token,

    /* SETTERS */
    setGlobalState,
    setIsAuth,
    setToken,
    
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