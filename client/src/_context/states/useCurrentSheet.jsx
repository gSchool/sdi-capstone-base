import { useState } from 'react';

const useCurrentSheet = () => {

  const [currentSheet, setCurrentSheetObj] = useState(
    {
      name: "",
      sheet_id: 0,
      fields: [],
      entries: [],
    }
  );

  const setCurrentSheet = (newState) => {
    setCurrentSheetObj(newState)
  }

  return { currentSheet, setCurrentSheet}
}

export default useCurrentSheet