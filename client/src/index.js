import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './_context/AppProvider'
import App from './_app/App';
import NotFound from './routes/NotFound';
import './_styles/_global.css'
import AuthProvider from './_context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <AuthProvider>
      <Router fallback={<NotFound />} exceptionElement={<NotFound />}>
        <App />
      </Router>
    </AuthProvider>
  </AppProvider>
);