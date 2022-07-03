import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useUser from './states/useUser'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState, toggleTheme, setTheme } = useGlobalState();
  const { user, setUser, resetUser, setIsAuth, setUid, setName, setEmail, setProfileImg } = useUser();
  const { refresh } = useRefresh();

  const store = {

    /* STATES */
    globalState,
    user,

    /* SETTERS */
    setGlobalState,
    setUser,
    setIsAuth,
    setUid,
    setName,
    setEmail,
    setProfileImg,
    setTheme,
    
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