import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../_context/AppProvider'
import useLogin from '../_context/effects/useLogin'
import { Img } from '../_styles/_global'
import google from '../_assets/icons/google.png';
import defaultProfileImg from '../_assets/img/default-profile-img.png';

const SignInBtn = () => {
  
  const { store } = useContext(GlobalContext)
  const { setUser } = store

  const { loginWithGoogle } = useLogin()

  const navigate = useNavigate()
  
  return (
    <>
      <div className="signin-btn" onClick={() => loginWithGoogle()}> <Img small alt="google" src={google} /> <span>Login with Google</span> </div>
      <div className="signin-btn2" onClick={() => { setUser({
        isAuth: true,
        token: "123456789",
        name: {
          full: "John Doe",
          first: "John",
          last: "Doe"
        },
        email: 'user@gmail.com',
        profileImg: defaultProfileImg,
      })
      navigate('/sheet/100')
      }}>Instant Login</div>
    </>
    )
    
  }
  
  const SignOutBtn = () => {

  const { handleSignOut } = useLogin()

  return (
    <div className="signout-btn" onClick={() => handleSignOut()}> <Img small alt="google" src={google} /> <span>Logout</span> </div>
  )

}

export { SignOutBtn, SignInBtn }
