import React, { createContext } from 'react'
import useCurrentSheet from './states/useCurrentSheet'
import useSelectedEntry from './states/useSelectedEntry'

const SheetContext = createContext()

const SheetProvider = ({ children }) => {
  const { currentSheet, setCurrentSheet } = useCurrentSheet();
  const { selectedEntry, setSelectedEntry } = useSelectedEntry();
  
  const sheet = {

    /* STATES */
    currentSheet,
    selectedEntry,

    /* SETTERS */
    setCurrentSheet,
    setSelectedEntry,

    /* EFFECTS */

  }

  return (
    <SheetContext.Provider value={{ sheet }}>
      { children }
    </SheetContext.Provider>
  )
}

export { SheetContext, SheetProvider };