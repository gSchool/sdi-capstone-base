import React, { useRef, createContext } from 'react'
import useSheetUsers from './states/useSheetUsers'

const UserAccessContext = createContext()

const UserAccessProvider = ({ children }) => {
  const { sheetUsers, setSheetUsers } = useSheetUsers();

  const userAccess = {

    /* STATES */
    sheetUsers,

    /* SETTERS */
    setSheetUsers,

    /* EFFECTS */


    /* REFS */

  }

  return (
    <UserAccessContext.Provider value={{ userAccess }}>
      { children }
    </UserAccessContext.Provider>
  )
}

export { UserAccessContext, UserAccessProvider };