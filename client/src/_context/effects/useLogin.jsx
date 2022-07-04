import {useContext} from "react"
import auth from "../../_config/firebase_config.js"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { GlobalContext } from "../AppProvider"
import defaultProfileImg from '../../_assets/img/default-profile-img.png';

const useLogin = () => {

  const { store } = useContext(GlobalContext)
  const { setUser, resetUser } = store

  const loginWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider).then((userCred) => {

      const credential = GoogleAuthProvider.credentialFromResult(userCred);
      const newToken = credential.accessToken
      const user = userCred.user // console.log(userCred) for user details

      setUser({
        isAuth: true,
        uid: user.uid,
        token: newToken,
        name: {
          full: user.displayName,
          first: user.displayName.split(" ")[0],
          last: user.displayName.split(" ")[1]
        },
        email: user.email,
        profileImg: user.photoURL ? user.photoURL : defaultProfileImg,
      })

    })
  .catch((error) => {
    console.log('Auth error code:\n', error.code)
    console.log('Auth error message:\n', error.message)
  });

  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      resetUser()
    })
  }

  return { loginWithGoogle, handleSignOut }

}

export default useLogin