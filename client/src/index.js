import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './_context/AppProvider'
import App from './_app/App';
import NotFound from './routes/NotFound';
import './_styles/_global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AppProvider>
    <Router fallback={<NotFound />} exceptionElement={<NotFound />}>
			<App />
    </Router>
  </AppProvider>
);