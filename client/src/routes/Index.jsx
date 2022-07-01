import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import Sheets from './sheets/Sheets';
import Loader from '../_components/Loader'
import { eHandler } from '../_helpers/eHandler';
import Sidebar from '../_components/Sidebar';
import { SignInBtn, SignOutBtn } from '../_components/LogInOutButton';

const Index = () => {

  const NotFound = lazy(() => import('./NotFound'));
  
  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sheets/*' element={ <Suspense fallback={<Loader/>}><Sheets/></Suspense> } />
      <Route path="/*" element={ <Suspense fallback={<Loader/>}><NotFound/></Suspense> } />
    </Routes>
  );
}

const Page = () => {
  
  const { store } = useContext(GlobalContext)
  const { theme, isAuth } = store

  return (
    <>
      <Div className={`${theme}`}>
        <SignInBtn />
        <SignOutBtn />
        <div>
          isAuth: {isAuth ? 'true' : 'false'}
        </div>
        <div>
          Your token: {store.token}
        </div>
      </Div>
    </>
  )
}

{/* <button name="get" onClick={() => setIsAuth(!isAuth)}>{ isAuth ? <>Authenticated ✅</> : <>Not Authenticated ❌</> }</button> */}

export default Index;