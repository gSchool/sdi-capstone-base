import { useState } from 'react';

const useSheetPageView = () => {

  const [sheetPageView, setSheetPageViewString] = useState('sheet');

  const setSheetPageView = (newState) => {
    setSheetPageViewString(newState);
  }

  return { sheetPageView, setSheetPageView };
}

export default useSheetPageView;