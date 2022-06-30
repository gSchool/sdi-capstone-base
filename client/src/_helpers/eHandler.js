// import helper from "./_helper/helper"

// Example usage: eHandler(null, 'api', {method: 'get', path: 'movies'}, (res)=>setGlobalState({movies: res}))
export const eHandler = async (e, target, options, callback) => {

  if (e) {
    e.preventDefault()
  }

  if (!callback) return console.log(`No callback supplied to eHandler!\nimport { eHandler, noCallback }\nand pass 'noCallback' if you want to do nothing.`);

  switch(target) {
    case 'checkMine':
      // call helper(options, callback)
      break;
    case 'rClick':
      // call helper(options, callback)
      break;
    default:
      console.log('unhandled click event')
  }
  
}

export const noCallback = () => {}