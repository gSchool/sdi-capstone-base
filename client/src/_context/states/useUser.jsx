import { useState } from 'react'

const useUser = () => {

  const defaults = {
    isAuth: false,
    uid: '',
    name: {
      full: '',
      first: '',
      last: '',
    },
    email: '',
    profileImg: '',
  }

  const [user, setUserState] = useState(defaults)

  // update multiple parts of the user state in one action
  const setUser = (updatedUserObj) => {
    setUserState({
      ...user,
      ...updatedUserObj,
    })
  }

  // reset the user state to default values
  const resetUser = (updatedUserObj) => {
    setUserState(defaults)
  }

  // update the user auth status
  const setIsAuth = (bool) => {
    setUserState({
      ...user,
      isAuth: bool,
    })
  }

  // update the user token
  const setUid = (string) => {
    setUserState({
    ...user,
    uid: string,
    })
  }

  // update the user name, pass in a full name as a string
  const setName = (string) => {
    setUserState({
      ...user,
      name: {
        full: string,
        first: string.split(' ')[0],
        last: string.split(' ')[1]
      }
    })
  }

  // update the user email
  const setEmail = (string) => {
    setUserState({
      ...user,
      email: string,
    })
  }

  // update the user profileImg url
  const setProfileImg = (url) => {
    setUserState({
      ...user,
      profileImg: url,
    })
  }

  return { user, setUser, resetUser, setIsAuth, setUid, setName, setEmail, setProfileImg }

}

export default useUser