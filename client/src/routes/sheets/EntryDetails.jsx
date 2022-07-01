import React, { useState, useEffect, useContext, useRef } from 'react';
import { SheetContext } from '../../_context/SheetProvider';

const EntryDetails = () => {
  const { sheet } = useContext(SheetContext);

  useEffect(() => {}, [sheet.selectedEntry])

  return (
    Object.keys(sheet.selectedEntry).length === 0 ? <></> :
    <div className="entry-details-container">
      <div>
        <span>Entry Details</span>
        <button className="entry-details-cancel" onClick={() => {sheet.setSelectedEntry({})}}>X</button>
      </div>
      <hr />
      <form className='entry-details-form'>
        {sheet.currentSheet.fields.map(field => {
          let index = sheet.selectedEntry.values.findIndex(value => value.field_id === field.field_id)
            return (
              <>
                <span key={field.field_id}>{field.name}</span>
                <input className='entry-details-input' defaultValue={index === -1 ? '': sheet.selectedEntry.values[index].value}/>
              </>
            )
          }
        )}
      </form>
      <button className='entry-details-update' onClick={(e) => e.preventDefault()}>Update</button>
    </div>
  )
}

export default EntryDetails;