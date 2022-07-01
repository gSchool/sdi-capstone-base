import React, { useState, useEffect, useContext, useRef } from 'react';
import { SheetContext } from '../../_context/SheetProvider';

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const EntryDetails = () => {
  const { sheet } = useContext(SheetContext);

  useEffect(() => {
  }, [sheet.selectedEntry])

  return (
    Object.keys(sheet.selectedEntry).length === 0 ? <div className="entry-details-container hidden"></div> :
    <div className="entry-details-container">
      <div className="entry-details-header">
        <button className="entry-details-cancel" onClick={() => {sheet.setSelectedEntry({})}}>&gt;</button>
        <span>Look at these guys</span>
      </div>
      <form className='entry-details-form'>
        {sheet.currentSheet.fields.map((field, i) => {
          let index = sheet.selectedEntry.values.findIndex(value => value.field_id === field.field_id)
            return (
              <div key={i} className='entry-details-field' onClick={(e)=>{
                  for (let element of document.getElementsByClassName('entry-details-field')) {
                    element.classList.remove('field-selected')
                  }
                  e.target.closest('.entry-details-field').classList.add('field-selected');
                }}>
                <div>
                  <span className="field-name">{field.name}</span>
                  <span className="field-type">{capitalize(field.type)}</span>
                </div>
                <hr />
                <input key={sheet.selectedEntry.entry_id} className='entry-details-input' defaultValue={index === -1 ? '': sheet.selectedEntry.values[index].value} />
              </div>
            )
          }
        )}
      </form>
      <button className='entry-details-update' onClick={(e) => e.preventDefault()}>Update</button>
    </div>
  )
}

export default EntryDetails;