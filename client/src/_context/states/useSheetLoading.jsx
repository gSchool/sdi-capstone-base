import { useState } from 'react';

const useSheetLoading = () => {

  const [sheetLoading, setSheetLoadingState] = useState(true);

  const setSheetLoading = (newState) => {
    setSheetLoadingState(newState);
  }

  return { sheetLoading, setSheetLoading};
}

export default useSheetLoading;