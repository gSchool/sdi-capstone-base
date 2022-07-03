import React from 'react';
import { useContext, useEffect } from 'react'
import { GlobalContext } from './AppProvider'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../_config/firebase_config.js';
import Loader from '../_components/Loader';

const AuthProvider = ({children}) => {
  
  const { store } = useContext(GlobalContext)
  const { setUser } = store
  
  const [user, loading, error] = useAuthState(auth);

  useEffect(()=>{
    
    if (user) {
      console.log('setting user details')
      setUser({
        isAuth: true,
        // token: user.uid,
        name: {
          full: user.displayName,
          first: user.displayName.split(' ')[0],
          last: user.displayName.split(' ')[1]
        },
        email: user.email,
        profileImg: user.photoURL,
      })
    }

    if (loading) {
      console.log('auth loading')
    }

    if (!loading) {
      console.log('auth loaded')
    }

    if (error) {
      console.log(error)
    }

  }, [user, loading])

  return (
    <>
      {loading ? <Loader /> : children}
    </>
  )

}

export default AuthProvider