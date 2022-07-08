import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../_context/AppProvider';
import Index from '../routes/Index'
import Sidebar from '../_components/Sidebar';
import toast, { Toaster } from 'react-hot-toast'

function App() {
  
  const { store } = useContext(GlobalContext)
  const { isAuth } = store.user

  return (
    <>
      { isAuth ? (
          <>
            <Sidebar />
            <Toaster
              position="bottom-center"
              reverseOrder={true}
              gutter={8}
              containerClassName="toaster"
              toastOptions={{
                // Define default options
                className: 'toast',
                duration: 3000,
                iconTheme: {
                  primary: '#35405d',
                  secondary: '#fff',
                  padding: '2rem',
                },
              }}
            />
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
