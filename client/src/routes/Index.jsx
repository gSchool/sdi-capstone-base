import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import Loader from '../_components/Loader'
import api from '../_helpers/api'
import dummyData from '../_dummy/sheet.json';

const Index = () => {

  const NotFound = lazy(() => import('./NotFound'));
  
  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sheets/' element={ <Suspense fallback={<Loader/>}>{/* <Sheets/> */}</Suspense> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

const Page = () => {

  let [currentSheet, setCurrentSheet] = useState(dummyData);

  console.log(dummyData);
  
  // useEffect(() => {
  //   api('get','sheets')
  //     .then(res => setCurrentSheet(res))
  //     .catch(err => console.log(err))
  // }, [])
  
  const { store } = useContext(GlobalContext)
  const { theme } = store

  return (
    <Div id='page' className={theme} flex column fills center centertext>
      <Div flex column centerchildren centertext>
        <h1>Kevinslist</h1>
        <div>
          Sheet: { currentSheet?.name }
        </div>
      </Div>
    </Div>
  )
}

export default Index;