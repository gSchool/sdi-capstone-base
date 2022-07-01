import React, {useContext, useEffect} from "react"
import auth from "../_config/firebase_config.js"
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { GlobalContext } from "../_context/AppProvider"


const SignInBtn = () => {
  const { store } = useContext(GlobalContext)
  const { theme, setIsAuth, setToken } = store
  const provider = new GoogleAuthProvider()
 
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCred) => {
        const credential = GoogleAuthProvider.credentialFromResult(userCred);
        const token = credential.accessToken
        console.log(token)
        setToken(token);
        setIsAuth(true);
      });
  };
  console.log(auth)

  
  return(<button onClick={() => loginWithGoogle()}> Login with Google </button>)
}

const SignOutBtn = () => {
  const { store } = useContext(GlobalContext)
  const { theme, setIsAuth, setToken } = store

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      setToken('')
    }
    );
  };

  return (
   ( 
      <button onClick={() => handleSignOut()}>Logout</button>
    )
  );
}

export { SignOutBtn, SignInBtn }
