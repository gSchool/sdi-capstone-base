import { useState } from 'react'

const useIsAuth = () => {

  const [isAuth, setIsAuthState] = useState(false)

  const setIsAuth = (bool) => {
    setIsAuthState(bool)
  }

  return { isAuth, setIsAuth }

}

export default useIsAuth