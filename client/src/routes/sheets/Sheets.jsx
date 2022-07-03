import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../../_context/AppProvider'
import { SheetContext } from '../../_context/SheetProvider';
import { Div } from '../../_styles/_global'
import Loader from '../../_components/Loader'
import api, { noCallback } from '../../_helpers/api'
import dummyData from '../../_dummy/sheet.json';
import SheetDisplay from  './SheetDisplay'
import Sidebar from '../../_components/Sidebar';
import "../../_styles/sheets.css";

const Sheets = () => {

  const NotFound = lazy(() => import('../NotFound'));
  
  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
        <Route path='/sheets/' element={ <Suspense fallback={<Loader/>}>{/* <Sheets/> */}</Suspense> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

const Page = () => {
  const { store } = useContext(GlobalContext)
  const { theme, isAuth, setIsAuth } = store

  const { sheet } = useContext(SheetContext);

  useEffect(() => {
    sheet.setCurrentSheet(dummyData);
  }, [])

  // useEffect(() => {
  //   api(['get', 'sheet/${sheetId}'], noCallback) // Usage: api([method, path, payload], callback)
  //     .then(res => setCurrentSheet(res))
  //     .catch(err => console.log(err))
  // }, [])
  

  return (
    <>
      <div className='sheet-page'>
        <SheetDisplay/>
      </div>
    </>
  )
}

{/* <button name="get" onClick={() => setIsAuth(!isAuth)}>{ isAuth ? <>Authenticated ✅</> : <>Not Authenticated ❌</> }</button> */}

    // <Div id='page' className={theme} flex column fills center centertext>
    //   <Div flex column centerchildren centertext>
    //     <h1>sheets</h1>
    //     <SheetDisplay />
    //   </Div>
    // </Div>

export default Sheets;