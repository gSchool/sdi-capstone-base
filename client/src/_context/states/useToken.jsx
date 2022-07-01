import { useState } from 'react'

const useToken = () => {

  const [token, setTokenState] = useState('')

  const setToken = (token) => {
    setTokenState(token)
  }

  return { token, setToken }

}

export default useToken