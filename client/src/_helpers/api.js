import { useContext } from "react";
import { GlobalContext } from '../_context/AppProvider'

const config = {
  development: {
      apiUrl: "http://localhost:8080/api"
  },
  test: {
      apiUrl: ''
  },
  production: {
      apiUrl: "https://api.smartsheets.app/api"
  }
}

export const baseApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

// Usage: api([method, path, payload], callback)
const api = async (options, callback) => {

  const { store } = useContext(GlobalContext)
  const { token } = store

  const method = options[0].toLowerCase() // 'GET', 'POST', 'PATCH', 'DELETE'
  const path = options[1] // Always defined
  const payload = options?.[2] // Only used for POST, PATCH, and DELETE requests -- expects a JSON object

  const runFetch = async () => {

    if (method === 'get') {
      const response = await fetch(`${baseApiUrl}/${path}`, { 
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }, 
    })
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const result = await response.json();
      if (callback) return callback(result);
      console.log('No callback supplied to apiReq');
    }

    if (method === 'post') {
      const response = await fetch(`${baseApiUrl}/${path}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const result = await response;
      if (callback) return callback(result);
      console.log('No callback supplied to apiReq');
    }

    if (method === 'delete') {
      const response = await fetch(`${baseApiUrl}/${path}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: payload })
      });
      
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      // const result = await response.text();
      if (callback) return callback();
      console.log('No callback supplied to apiReq');
    }

  }
  
  try {
    return await runFetch();
  } catch (error) {
    return console.log(error.message);
  }

  
}

export const noCallback = () => {}

export default api

