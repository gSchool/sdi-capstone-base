import React, { useState, useEffect, useContext, useRef } from 'react';
import { SheetContext } from '../../_context/SheetProvider';
import edit from '../../_assets/icons/edit-purple.png'
import Loader from '../../_components/Loader';

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const EntryDetails = () => {
  const { sheet } = useContext(SheetContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, [sheet.selectedEntry])

  return (
    (Object.keys(sheet.selectedEntry).length === 0 && sheet.newEntry === false) ?
    <div className="entry-details-container hidden"></div>
    :
    <div className="entry-details-container">
      {isLoading === true ? <div className="entry-details-loader">Updating...</div> : <></>}
      <div className="entry-details-header">
        <button className="entry-details-cancel" onClick={() => {
          sheet.setSelectedEntry({})
          sheet.setNewEntry(false)
        }}>&gt;</button>
        <span>{sheet.newEntry === true ? 'New Entry' : 'Update Entry'}</span>
        <img src={edit} />
      </div>
      <form className='entry-details-form'>
        {sheet.currentSheet.fields.map((field, i) => {
          let index;
          if (sheet.newEntry === false) {
            index = sheet.selectedEntry.values.findIndex(value => value.field_id === field.field_id)
          } else {
            index = -1;
          }
            return (
              <div key={i} data-field={JSON.stringify(field)} className='entry-details-field' onFocus={(e)=>{
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
                <input id={index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}
                  key={index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}
                  className='entry-details-input'
                  defaultValue={index === -1 ? '': sheet.selectedEntry.values[index].value} />
              </div>
            )
          }
        )}
      </form>
      <button className='entry-details-update' onClick={async (e) => {
        e.preventDefault()

        //TODO: Build json to send to server
        for (let element of document.getElementsByClassName('entry-details-field')) {
          let fieldData = JSON.parse(element.dataset.field)
          let inputElement = element.querySelector('input')

          console.log(inputElement.value) // newValue
          console.log(inputElement.id) // value id
        }

        setIsLoading(true);

        //TODO: Send request to server and set up logic to handle response
        new Promise(resolve => setTimeout(resolve, 2000)).then(() => setIsLoading(false))

      }}>Submit</button>
    </div>
  )
}

export default EntryDetails;