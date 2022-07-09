import { useState } from 'react';

const useSheetUsers = () => {

  const [ sheetUsers, setSheetUsersArray ] = useState([]);

  const setSheetUsers = (newState) => {
    setSheetUsersArray(newState);
  }

  return { sheetUsers, setSheetUsers };
}

export default useSheetUsers;