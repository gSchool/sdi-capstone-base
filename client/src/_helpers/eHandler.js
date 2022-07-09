
// Example usage: eHandler(null, 'api', {method: 'get', path: 'movies'}, (res)=>setGlobalState({movies: res}))
const eHandler = async (e, target, options, callback) => {

  if (e) {
    e.preventDefault()
  }

  if (!callback) return console.log(`No callback supplied to eHandler!\nimport { eHandler, noCallback }\nand pass 'noCallback' if you want to do nothing.\nOr, pass an empty function () => {}`);

  switch(target) {
    case 'showCover':
      document.getElementById('page').classList.add('extend');
      document.getElementById('cover').classList.remove('hide');
      document.getElementById('cover').classList.add('show');
      break;
    case 'hideCover':
      document.getElementById('page').classList.remove('extend');
      document.getElementById('cover').classList.remove('show');
      document.getElementById('cover').classList.add('hide');
      break;
    default:
      console.log('unhandled click event')
  }
  
}

export const noCallback = () => {}

export default eHandler