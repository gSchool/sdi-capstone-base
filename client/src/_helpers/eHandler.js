import api from "./api";

// Example usage: eHandler(null, 'api', {method: 'get', path: 'movies'}, (res)=>setGlobalState({movies: res}))
const eHandler = async (e, target, options, callback) => {

  if (e) {
    e.preventDefault()
  }

  if (!callback) return console.log(`No callback supplied to eHandler!\nimport { eHandler, noCallback }\nand pass 'noCallback' if you want to do nothing.\nOr, pass an empty function () => {}`);

  switch(target) {
    case 'api':
      api(options, callback)
      break;
    case 'showCover':
      document.getElementById('page').classList.toggle('extend');
      document.getElementById('cover').classList.toggle('show');
      break;
    default:
      console.log('unhandled click event')
  }
  
}

export const noCallback = () => {}

export default eHandler