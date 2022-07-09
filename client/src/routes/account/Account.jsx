import React, { useContext } from 'react';
import { GlobalContext } from '../../_context/AppProvider'
import { Div, Fix } from '../../_styles/_global'
import { SignOutBtn } from '../../_components/SignInOutBtns';
import '../../_styles/account.css';
import ThemeSwitcher from '../../_components/ThemeSwitcher';
import toast from 'react-hot-toast';

const Account = () => {
  
  const { store } = useContext(GlobalContext)
  const { user } = store
  const { profileImg, name, email } = user

  const copy = () => {
    navigator.clipboard.writeText(user.token)
    toast.success('Copied token to clipboard!')
  }

  return (
    <>
      <Div centerchildren flex fills className="account-page">
        <Div flex column card centertext className="account-details">
          <div className="account-meta">
            <div className="account-meta-img">
              { profileImg ? <img src={profileImg} alt='profile' className='profile-img' /> : 'no profile image' }
            </div>
            <div className="account-meta-name">
              {name.first} {name.last}
            </div>
            <div className="account-meta-email">
              {email}
            </div>
            <div id="token" onClick={copy}>
              <div className='token-btn'>
                Copy Token
              </div>
            </div>
          </div>
          <SignOutBtn />
        </Div>
      </Div>
      <Fix offset="2rem" top right className='account-theme-switcher'>
        <ThemeSwitcher />
      </Fix>
    </>
  )
}

export default Account