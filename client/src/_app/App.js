import React from 'react'
import Index from '../routes/Index'
import Sidebar from '../_components/Sidebar';

function App() {

  return (
    <>
      <Sidebar /> 
      <div id="page">
        <Index />
      </div>
    </>
  );
}

export default App;
