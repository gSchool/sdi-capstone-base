import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useUser from './states/useUser'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState, toggleTheme, setTheme } = useGlobalState();
  const { user, setUser, resetUser, setIsAuth, setUid, setName, setEmail, setProfileImg, setSheetAccess, addSheetAccess, removeSheetAccess } = useUser();
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
    setSheetAccess,
    
    /* EFFECTS */
    resetUser,
    refresh,
    toggleTheme,
    addSheetAccess,
    removeSheetAccess,

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };