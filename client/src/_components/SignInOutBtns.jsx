import React from "react"
import useLogin from '../_context/effects/useLogin'
import { Img } from '../_styles/_global'
import google from '../_assets/icons/google.png';

const SignInBtn = () => {
  
  const { loginWithGoogle } = useLogin()
  
  return (
    <div className="signin-btn" onClick={() => loginWithGoogle()}> <Img small alt="google" src={google} /> <span>Login with Google</span> </div>
    )
    
  }
  
  const SignOutBtn = () => {

  const { handleSignOut } = useLogin()

  return (
    <div className="signout-btn" onClick={() => handleSignOut()}> <Img small alt="google" src={google} /> <span>Logout</span> </div>
  )

}

export { SignOutBtn, SignInBtn }
