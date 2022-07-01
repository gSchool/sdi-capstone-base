import React, { useContext } from 'react';
import { GlobalContext } from '../../_context/AppProvider'
import { Div } from '../../_styles/_global'
import { SignOutBtn } from '../../_components/SignInOutBtns';

const Account = () => {
  
  const { store } = useContext(GlobalContext)
  const { theme, user } = store

  return (
    <Div centerchildren flex fills className={`${theme}`}>
      <Div flex column card centertext className={`${theme}`}>
        <div>
          { store.profileImg ? <img src={store.profileImg} alt='profile' /> : 'no profile image' }
        </div>
        <div>
          Name: {store.name.first} {store.name.last}
        </div>
        <div>
          Email: {store.email}
        </div>
        <SignOutBtn />
      </Div>
    </Div>
  )
}

export default Account