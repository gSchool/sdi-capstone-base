import React, { createContext } from 'react'
import useCurrentSheet from './states/useCurrentSheet'
import useSelectedEntry from './states/useSelectedEntry'
import useNewEntry from './states/useNewEntry'
import useSheetPageView from './states/useSheetPageView'
import useSheetLoading from './states/useSheetLoading'

const SheetContext = createContext()

const SheetProvider = ({ children }) => {
  const { currentSheet, setCurrentSheet } = useCurrentSheet();
  const { selectedEntry, setSelectedEntry } = useSelectedEntry();
  const { newEntry, setNewEntry } = useNewEntry();
  const { sheetPageView, setSheetPageView } = useSheetPageView();
  const { sheetLoading, setSheetLoading } = useSheetLoading();

  const sheet = {

    /* STATES */
    currentSheet,
    selectedEntry,
    newEntry,
    sheetPageView,
    sheetLoading,

    /* SETTERS */
    setCurrentSheet,
    setSelectedEntry,
    setNewEntry,
    setSheetPageView,
    setSheetLoading,

    /* EFFECTS */

  }

  return (
    <SheetContext.Provider value={{ sheet }}>
      { children }
    </SheetContext.Provider>
  )
}

export { SheetContext, SheetProvider };