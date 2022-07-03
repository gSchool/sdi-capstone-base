import React, { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from '../_context/AppProvider'

const ThemeProvider = ({ children }) => {

  const { store } = useContext(GlobalContext)
  const { globalState, setTheme } = store
  const { theme } = globalState

  useEffect(() => {
    const userTheme = localStorage.getItem('smartsheets-theme')
    setTheme(userTheme)
  }, [theme])


  if (theme === 'dark') {
    return (
      <div id='dark'>
        {children}
      </div>
    )
  } else {
    return (
      <div id='lite'>
        {children}
      </div>
    )
  }

}

export default ThemeProvider;