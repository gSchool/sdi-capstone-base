
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

/*

    api({method, path, payload}, callback)
      adding a lot of movies at once: apiReq('add', 'movies', ['twister','spiderman'])
      modifying a lot of movies at once: apiReq('update', 'movies', [['twister', 'a swirling cloud'],['spiderman', 'flying man-child']])
      deleting a lot of movies at once: apiReq('delete', 'movies', ['twister','spiderman'])
      get all movies: apiReq('get', 'movies')
      get a single movie: apiReq('get', 'movies', 'twister')

  */

const api = async (options, callback) => {

  const { method, path, payload } = options

  const runFetch = async () => {

    if (method === 'get') {
      const response = await fetch(`${baseApiUrl}/${path}`)
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
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

export default api

