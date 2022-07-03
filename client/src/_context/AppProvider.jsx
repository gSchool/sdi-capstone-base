import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useUser from './states/useUser'
import useToggleTheme from './effects/useToggleTheme'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { user, setUser, resetUser, setIsAuth, setToken, setName, setEmail, setProfileImg } = useUser();
  const { theme, toggleTheme } = useToggleTheme();
  const { refresh } = useRefresh();

  const store = {

    /* STATES */
    globalState,
    theme,
    user,

    /* SETTERS */
    setGlobalState,
    setUser,
    setIsAuth,
    setToken,
    setName,
    setEmail,
    setProfileImg,
    
    /* EFFECTS */
    resetUser,
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