import React, { useContext, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div, Img, Fix } from '../_styles/_global'
import Loader from '../_components/Loader'
import { SignInBtn } from '../_components/SignInOutBtns';
import p1login from '../_assets/img/p1login.png';
import p1loginmobile from '../_assets/img/p1loginmobile.png';
import home from '../_assets/img/home-images.png';
import pentagon from '../_assets/img/pentagon.png';
import dod from '../_assets/img/dod-seal.png';
import { SheetProvider } from '../_context/SheetProvider'

const Index = () => {

  const { store } = useContext(GlobalContext)
  const { user } = store
  const { isAuth } = user


  const Sheets = lazy(() => import('./sheets/Sheets'));
  const Account = lazy(() => import('./account/Account'));
  const NotFound = lazy(() => import('./NotFound'));

  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sheet/create/*' element={ <Suspense fallback={<Loader/>}><NotFound/></Suspense> } />
        <Route path='/sheet/edit/*' element={ <Suspense fallback={<Loader/>}><NotFound/></Suspense> } />
        <Route path='/sheet/:sheetId/*' element={ isAuth ? <Suspense fallback={<Loader/>}><Sheets/></Suspense> : <Navigate to="/" replace={true} /> }/>
        <Route path='/account/*' element={ isAuth ? <Suspense fallback={<Loader/>}><Account/></Suspense> : <Navigate to="/" replace={true} /> }/>
      <Route path="/*" element={ isAuth ? <Suspense fallback={<Loader/>}><NotFound/></Suspense> : <Navigate to="/" replace={true} /> }/>
    </Routes>
  );
}

const Page = () => {

  const { store } = useContext(GlobalContext)
  const { globalState, user } = store
  const { loading } = globalState
  const { isAuth, name } = user

  return (
    <>
      { loading ? <>load</>
        : isAuth ? (
          <Div centerchildren flex fills>
            <Fix offset="2rem" lower right className="dod-img">
              <Img alt="home" style={{width: '7rem', borderRadius: '2rem', marginBottom: '0rem'}} src={dod} />
            </Fix>
            <Div flex column centertext>
              <Img alt="home" style={{width: '22rem', borderRadius: '2rem', marginBottom: '2rem'}} src={home} />
              <div className="index-welcome">
                Welcome to
              </div>
              <div className="index-app">
                SmartSheets
              </div>
              <div className="index-name">
                {name.first} {name.last}
              </div>
            </Div>
          </Div>
        ) : (
          <Div centerchildren flex fills className='login-screen'>
            <Div className="p1login">
              <Img className="mainimg" alt="login" src={p1login} />
              <Img className="mainimg-mobile" alt="login" src={p1loginmobile} />
              <SignInBtn />
            </Div>
          </Div>
        )
      }
    </>
  )
}

export default Index;