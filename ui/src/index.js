import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider, createTheme} from '@mui/material/';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#BD5334',
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  
);
