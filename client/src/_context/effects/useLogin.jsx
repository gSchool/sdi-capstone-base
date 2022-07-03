import {useContext} from "react"
import auth from "../../_config/firebase_config.js"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { GlobalContext } from "../AppProvider"

const useLogin = () => {

  const { store } = useContext(GlobalContext)
  const { setUser, resetUser } = store

  const provider = new GoogleAuthProvider()

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCred) => {

        const credential = GoogleAuthProvider.credentialFromResult(userCred);
        const newToken = credential.accessToken
        const user = userCred.user

        // console.log(userCred)

        setUser({
          isAuth: true,
          token: newToken,
          name: {
            full: user.displayName,
            first: user.displayName.split(" ")[0],
            last: user.displayName.split(" ")[1]
          },
          email: user.email,
          profileImg: user.photoURL,
        })

      })
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      resetUser()
    })
  }

  return { loginWithGoogle, handleSignOut }

}

export default useLogin