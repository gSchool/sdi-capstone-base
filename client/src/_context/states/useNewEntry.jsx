import { useState } from 'react';

const useNewEntry = () => {

  const [newEntry, setNewEntryState] = useState(false);

  const setNewEntry = (newState) => {
    setNewEntryState(newState);
  }

  return { newEntry, setNewEntry };
}

export default useNewEntry;