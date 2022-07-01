import React, { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useUser from './states/useUser'
import useToggleTheme from './effects/useToggleTheme'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { isAuth, setIsAuth, token, setToken, name, setName, email, setEmail, profileImg, setProfileImg } = useUser();
  const { theme, toggleTheme } = useToggleTheme();
  const { refresh } = useRefresh();

  const store = {

    /* STATES */
    globalState,
    theme,
    isAuth,
    token,
    name,
    email,
    profileImg,

    /* SETTERS */
    setGlobalState,
    setIsAuth,
    setToken,
    setName,
    setEmail,
    setProfileImg,
    
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