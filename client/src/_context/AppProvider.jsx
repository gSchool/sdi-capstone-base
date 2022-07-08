import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useUser from './states/useUser'
import useRefresh from './effects/useRefresh'
import usePageView from './states/usePageView'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState, toggleTheme, setTheme } = useGlobalState();
  const { user, setUser, resetUser, setIsAuth, setUid, setName, setEmail, setProfileImg, setSheetAccess, addSheetAccess, removeSheetAccess } = useUser();
  const { refresh } = useRefresh();
  const { pageView, setPageView } = usePageView();

  const store = {

    /* STATES */
    globalState,
    user,
    pageView,

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
    setPageView,
    
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