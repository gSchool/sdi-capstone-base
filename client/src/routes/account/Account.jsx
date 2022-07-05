import React, { useContext } from 'react';
import { GlobalContext } from '../../_context/AppProvider'
import { Div } from '../../_styles/_global'
import { SignOutBtn } from '../../_components/SignInOutBtns';
import '../../_styles/account.css';

const Account = () => {
  
  const { store } = useContext(GlobalContext)
  const { theme, user } = store
  const { profileImg, name, email } = user

  return (
    <Div centerchildren flex fills className={`${theme}`}>
      <Div flex column card centertext className={`${theme}`}>
        <div>
          { profileImg ? <img src={profileImg} alt='profile' className='profile-img' /> : 'no profile image' }
        </div>
        <div>
          {name.first} {name.last}
        </div>
        <div>
          {email}
        </div>
        <SignOutBtn />
      </Div>
    </Div>
  )
}

export default Account