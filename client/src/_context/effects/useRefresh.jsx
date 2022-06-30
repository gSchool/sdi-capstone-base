import { useState } from 'react'

const useRefresh = () => {

  const [, setRefreshState] = useState(false)

  const refresh = () => {
    setRefreshState((prevState)=>!prevState)
  }

  return { refresh }

}

export default useRefresh