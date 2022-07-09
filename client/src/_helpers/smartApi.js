import { useContext } from "react";
import { GlobalContext } from '../_context/AppProvider'


/*    ***** EXAMPLE USAGE *****


import useApi from '../_helpers/useApi';

const newSheet {
  "name": "sheetysheet",
  "short_name": "sht",
  "templates": "none"
}

const newFields = {
  "fields": [
    {
      "field_id": "new",
      "type": "string",
      "name": "columnOne"
    },
    {
      "field_id": "new",
      "type": "string",
      "name": "columnTwo"
    },
    {
      "field_id": "new",
      "type": "string",
      "name": "columnThree"
    }
  ]
}

smartApi(['GET', `get_sheet_users/${sheetId}`], user.token).then(result => {console.log(result)})
smartApi(['POST', `add_sheet/`, newSheet], user.token).then(result => {console.log(result)})
smartApi(['PATCH', `handle_field/${sheetId}`, newFields], {user.token}).then(result => {console.log(result)})
smartApi(['DELETE', `remove_roles/${user_id}`], user.token).then(result => {console.log(result)})


NOTE: user.token comes from GlobalContext -> user
*/





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

const smartApi = async (options, token, callback) => {

  const method = options[0].toLowerCase() // 'GET', 'POST', 'PATCH', 'DELETE'
  const path = options[1] // Always defined
  const payload = options?.[2] // Only used for POST, PATCH, and DELETE requests -- expects a JSON object

  const runFetch = async () => {

    if (method === 'get') {
      let response = await fetch(`${baseApiUrl}/${path}`, { 
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          let result = await response.json()
          if (callback) return callback(result);
          return result;
        } else {
          let result = await response.text()
          if (callback) return callback(result);
          return result;
        }
      }

    }

    if (method === 'post') {
      let response = await fetch(`${baseApiUrl}/${path}`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          let result = await response.json()
          if (callback) return callback(result);
          return result;
        } else {
          let result = await response.text()
          if (callback) return callback(result);
          return result;
        }
      }
    }

    if (method === 'patch') {
      let response = await fetch(`${baseApiUrl}/${path}`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          let result = await response.json()
          if (callback) return callback(result);
          return result;
        } else {
          let result = await response.text()
          if (callback) return callback(result);
          return result;
        }
      }
    }

    if (method === 'delete') {
      let response = await fetch(`${baseApiUrl}/${path}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: payload })
      })
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          let result = await response.json()
          if (callback) return callback(result);
          return result;
        } else {
          let result = await response.text()
          if (callback) return callback(result);
          return result;
        }
      }
    }

  }
  
  try {
    return await runFetch();
  } catch (error) {
    return console.log(error.message);
  }

}

export const noCallback = () => {}

export default smartApi

