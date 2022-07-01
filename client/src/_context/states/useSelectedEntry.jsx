import { useState } from 'react';

const useSelectedEntry = () => {

  const [selectedEntry, setSelectedEntryObj] = useState({});

  const setSelectedEntry = (newState) => {
    setSelectedEntryObj(newState);
  }

  return { selectedEntry, setSelectedEntry};
}

export default useSelectedEntry;