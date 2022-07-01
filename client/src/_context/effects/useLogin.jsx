import {useContext} from "react"
import auth from "../../_config/firebase_config.js"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { GlobalContext } from "../AppProvider"

const useLogin = () => {

  const { store } = useContext(GlobalContext)
  const { theme, setIsAuth, setToken, setName, setEmail, setProfileImg } = store

  const provider = new GoogleAuthProvider()

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCred) => {

        const credential = GoogleAuthProvider.credentialFromResult(userCred);
        const token = credential.accessToken
        const user = userCred.user

        // console.log(userCred)

        setIsAuth(true)
        setToken(token)
        setName(user.displayName)
        setEmail(user.email)
        setProfileImg(user.photoURL)

      })
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      setToken('')
      setName('')
      setEmail('')
      setProfileImg('')
    })
  }

  return { loginWithGoogle, handleSignOut }

}

export default useLogin