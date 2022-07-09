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
                success: {
                  style: {
                    background: 'var(--color-green)',
                    color: 'var(--color-green-toast)',
                    fontWeight: 'var(--bold)'
                  },
                  iconTheme: {
                    primary: 'var(--color-green-toast-icon-primary)',
                    secondary: 'var(--color-green-toast-icon-secondary)',
                    padding: '2rem',
                  },
                },
                error: {
                  style: {
                    background: 'var(--color-red)',
                    color: 'var(--color-red-toast)',
                    fontWeight: 'var(--bold)'
                  },
                  iconTheme: {
                    primary: 'var(--color-red-toast-icon-primary)',
                    secondary: 'var(--color-red-toast-icon-secondary)',
                    padding: '2rem',
                  },
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
