import React, { createContext } from 'react'
import useCurrentSheet from './states/useCurrentSheet'
import useSelectedEntry from './states/useSelectedEntry'
import useNewEntry from './states/useNewEntry'

const SheetContext = createContext()

const SheetProvider = ({ children }) => {
  const { currentSheet, setCurrentSheet } = useCurrentSheet();
  const { selectedEntry, setSelectedEntry } = useSelectedEntry();
  const { newEntry, setNewEntry } = useNewEntry();

  const sheet = {

    /* STATES */
    currentSheet,
    selectedEntry,
    newEntry,

    /* SETTERS */
    setCurrentSheet,
    setSelectedEntry,
    setNewEntry,

    /* EFFECTS */

  }

  return (
    <SheetContext.Provider value={{ sheet }}>
      { children }
    </SheetContext.Provider>
  )
}

export { SheetContext, SheetProvider };