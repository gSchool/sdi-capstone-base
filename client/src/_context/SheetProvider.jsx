import React, { createContext } from 'react'
import useCurrentSheet from './states/useCurrentSheet'
import useSelectedEntry from './states/useSelectedEntry'
import useNewEntry from './states/useNewEntry'
import useSheetPageView from './states/useSheetPageView'

const SheetContext = createContext()

const SheetProvider = ({ children }) => {
  const { currentSheet, setCurrentSheet } = useCurrentSheet();
  const { selectedEntry, setSelectedEntry } = useSelectedEntry();
  const { newEntry, setNewEntry } = useNewEntry();
  const { sheetPageView, setSheetPageView } = useSheetPageView();

  const sheet = {

    /* STATES */
    currentSheet,
    selectedEntry,
    newEntry,
    sheetPageView,

    /* SETTERS */
    setCurrentSheet,
    setSelectedEntry,
    setNewEntry,
    setSheetPageView,

    /* EFFECTS */

  }

  return (
    <SheetContext.Provider value={{ sheet }}>
      { children }
    </SheetContext.Provider>
  )
}

export { SheetContext, SheetProvider };