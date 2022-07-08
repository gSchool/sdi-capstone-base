import { useState } from 'react';

const usePageView = () => {

  const [pageView, setPageViewState] = useState('');

  const setPageView = (newState) => {
    setPageViewState(newState);
  }

  return { pageView, setPageView };
}

export default usePageView;