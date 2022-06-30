import { useState } from 'react'

const useToggleTheme = () => {

  const [theme, setThemeState] = useState('lite')

  const toggleTheme = () => {
    setThemeState((prevState)=>{
      if (prevState === 'lite') {
        return 'dark'
      }
      if (prevState === 'dark') {
        return 'lite'
      }
    })
  }

  return { theme, toggleTheme }

}

export default useToggleTheme