import { useState } from 'react'

const useUser = () => {

  const [isAuth, setIsAuthState] = useState(false)
  const [token, setTokenState] = useState('')
  const [name, setNameState] = useState('')
  const [email, setEmailState] = useState('')
  const [profileImg, setProfileImgState] = useState('')

  const setIsAuth = (bool) => {
    setIsAuthState(bool)
  }

  const setToken = (token) => {
    setTokenState(token)
  }

  const setName = (name) => {
    setNameState({
      full: name,
      first: name.split(' ')[0],
      last: name.split(' ')[1]
    })
  }

  const setEmail = (email) => {
    setEmailState(email)
  }

  const setProfileImg = (imgurl) => {
    setProfileImgState(imgurl)
  }

  return { isAuth, setIsAuth, token, setToken, name, setName, email, setEmail, profileImg, setProfileImg }

}

export default useUser