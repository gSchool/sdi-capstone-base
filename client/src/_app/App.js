import React, { useContext } from 'react';
import { GlobalContext } from '../_context/AppProvider';
import Index from '../routes/Index'
import Sidebar from '../_components/Sidebar';

function App() {

  const { store } = useContext(GlobalContext)
  const { isAuth} = store

  return (
    <>
      { isAuth ? (
          <>
            <Sidebar />
            <div id="page">
              <Index />
            </div>
          </>
        )
        : <Index />
      }
    </>
  );
}

export default App;
