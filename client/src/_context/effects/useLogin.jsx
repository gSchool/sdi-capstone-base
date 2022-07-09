import { useContext } from "react"
import auth from "../../_config/firebase_config.js"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { GlobalContext } from "../AppProvider"
import defaultProfileImg from '../../_assets/img/default-profile-img.png';
import smartApi from "../../_helpers/smartApi"

const useLogin = () => {

  const { store } = useContext(GlobalContext)
  const { setUser, resetUser } = store

  const loginWithGoogle = () => {

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (userCred) => {
        const idToken = await auth.currentUser.getIdToken()
        const user = userCred.user // console.log(userCred) for user details

        smartApi(['POST', `add_user/`], idToken)
        return {idToken: idToken, user: user};
      })
      .then((data) => {
        setUser({
          isAuth: true,
          uid: data.user.uid,
          token: data.idToken,
          name: {
            full: data.user.displayName,
            first: data.user.displayName.split(" ")[0],
            last: data.user.displayName.split(" ")[1]
          },
          email: data.user.email,
          profileImg: data.user.photoURL ? data.user.photoURL : defaultProfileImg,
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