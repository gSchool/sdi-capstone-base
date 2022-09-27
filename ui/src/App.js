import React, { useEffect, useState} from 'react';
import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  let [names, setNames] = useState([ ]);

  useEffect(() => {
    fetch(ApiUrl + "/users")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      App is running - good work: 
      { names.map(author => author.first_name + " ")}
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
