import { useState } from 'react'

const useGlobalState = () => {

  const [globalState, setGlobalStateObj] = useState({
    language: "en",
  })

  const setGlobalState = (updates) => {
    setGlobalStateObj({...globalState, ...updates})
  }

  return { globalState, setGlobalState }

}

export default useGlobalState