import React, { useContext } from 'react';
import { GlobalContext } from '../../_context/AppProvider'
import { Div } from '../../_styles/_global'
import { SignOutBtn } from '../../_components/SignInOutBtns';
import '../../_styles/account.css';

const Account = () => {
  
  const { store } = useContext(GlobalContext)
  const { user } = store
  const { profileImg, name, email } = user

  return (
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
        </div>
        <SignOutBtn />
      </Div>
    </Div>
  )
}

export default Account