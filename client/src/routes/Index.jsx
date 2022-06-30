import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import Loader from '../_components/Loader'
import baseApiUrl from '../_helpers/api'

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

  let [names, setNames] = useState([]);

  useEffect(() => {
    fetch(baseApiUrl + "/api/authors")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);

  const { store } = useContext(GlobalContext)
  const { theme } = store

  return (
    <Div id='page' className={theme} flex column fills center centertext>
      <Div flex column centerchildren centertext>
        <h1>Ventsweeper</h1>
        <div>
          App is running 😎 - good work: 
          { names.map(author => " " + author.firstName)}
        </div>
      </Div>
    </Div>
  )
}

export default Index;