import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './_context/AppProvider'
import App from './_app/App';
import NotFound from './routes/NotFound';
import './_styles/_global.css'
import AuthProvider from './_context/AuthProvider';
import ThemeProvider from './_context/ThemeProvider';
import { SheetProvider } from './_context/SheetProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <ThemeProvider>
      <SheetProvider>
        <Router fallback={<NotFound />} exceptionElement={<NotFound />}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </SheetProvider>
    </ThemeProvider>
  </AppProvider>
);