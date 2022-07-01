import React, { useContext, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div, Img } from '../_styles/_global'
import Loader from '../_components/Loader'
import { SignInBtn } from '../_components/SignInOutBtns';
import p1login from '../_assets/img/p1login.png';
import p1loginmobile from '../_assets/img/p1loginmobile.png';
import { SheetProvider } from '../_context/SheetProvider'

const Index = () => {

  const { store } = useContext(GlobalContext)
  const { isAuth } = store

  const Sheets = lazy(() => import('./sheets/Sheets'));
  const Account = lazy(() => import('./account/Account'));
  const NotFound = lazy(() => import('./NotFound'));

  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sheets/*' element={ isAuth ? <Suspense fallback={<Loader/>}><SheetProvider><Sheets/></SheetProvider></Suspense> : <Navigate to="/" replace={true} /> }/>
        <Route path='/account/*' element={ isAuth ? <Suspense fallback={<Loader/>}><Account/></Suspense> : <Navigate to="/" replace={true} /> }/>
      <Route path="/*" element={ isAuth ? <Suspense fallback={<Loader/>}><NotFound/></Suspense> : <Navigate to="/" replace={true} /> }/>
    </Routes>
  );
}

const Page = () => {

  const { store } = useContext(GlobalContext)
  const { theme, isAuth } = store

  return (
    <>
      { isAuth ? (
          <Div centerchildren flex fills className={`${theme}`}>
            <Div flex column card centertext className={`${theme}`}>
              <div>
                Hello: {store.name.first} {store.name.last}
              </div>
            </Div>
          </Div>
        ) : (
          // <Div flex column fills centerchildren className="p1login">
          <Div className="p1login">
            <Img className="mainimg" alt="login" src={p1login} />
            <Img className="mainimg-mobile" alt="login" src={p1loginmobile} />
            <SignInBtn />
          </Div>
        )
      }
    </>
  )
}

export default Index;