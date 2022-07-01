import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './_context/AppProvider'
import { SheetProvider } from './_context/SheetProvider'
import App from './_app/App';
import NotFound from './routes/NotFound';
import './_styles/_global.css'
import "./_config/firebase_config"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <SheetProvider>
      <Router fallback={<NotFound />} exceptionElement={<NotFound />}>
        <App />
      </Router>
    </SheetProvider>
  </AppProvider>
);