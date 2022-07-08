import React, { useState, useEffect, useContext, useRef } from 'react';
import { SheetContext } from '../../_context/SheetProvider';
import edit from '../../_assets/icons/edit-purple.png'
import Loader from '../../_components/Loader';
import '../../_styles/entry-details.css';
import { Div } from '../../_styles/_global'
import { ReactComponent as Check } from '../../_assets/icons/checkmark.svg';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const EntryDetails = () => {
  const { sheet } = useContext(SheetContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const entryId = useParams().entryId;
  const { sheetPageView, setSheetPageView, setSelectedEntry } = sheet;

  const navigate = useNavigate();
  
  const submitData = () => {
    //TODO: Build json to send to server
    for (let element of document.getElementsByClassName('entry-details-field')) {
      let fieldData = JSON.parse(element.dataset.field)
      let inputElement = element.querySelector('input')
  
      console.log(inputElement.value) // newValue
      console.log(inputElement.id) // value id
    }
  
    setIsLoading(true);
  
    //TODO: Send request to server and set up logic to handle response
    new Promise(resolve => setTimeout(resolve, 500)).then(() => {
      sheet.setSelectedEntry({})
      sheet.setNewEntry(false)
      setIsLoading(false)
      navigate(`/sheet/${location.pathname.split('/')[2]}`)
    })
  }

  useEffect(() => {

    //TODO: Move some of this to SheetDisplay
    if (entryId !== undefined) {
      let index = sheet.currentSheet.entries.findIndex(entry => entry.entry_id === parseInt(entryId))

      if (index !== -1) {
        
        sheet.setSelectedEntry(sheet.currentSheet.entries[index])

        var topPos = document.getElementById(entryId).offsetTop
        var containerHeight = document.getElementsByClassName('sheet-display-body')[0].offsetHeight
        console.log("Offset Top:", topPos)
        if (topPos > containerHeight-200) {
          document.getElementsByClassName('sheet-display-body')[0].scroll({
            top: topPos-400,
            behavior: 'smooth'
          })
        } 
      } else {
        if (sheet.currentSheet.sheet_id !== 0 && sheet.sheetLoading === false) {
          // setSheetPageView('sheet')
          setSelectedEntry({})
          navigate(`/sheet/${location.pathname.split('/')[2]}`)
        }
      }
      if (sheet.currentSheet.sheet_id === 0 && sheet.sheetLoading === false) {
        // setSheetPageView('sheet')
        setSelectedEntry({})
        navigate(`/`)
      }
    } else {
      setSelectedEntry({})
    }
    
    if (sheet.currentSheet.sheet_id === 0 && sheet.sheetLoading === false) {
      // setSheetPageView('sheet')
      setSelectedEntry({})
      navigate(`/`)
    }
  }, [location, sheet.currentSheet, sheet.sheetLoading])


  return (
    (Object.keys(sheet.selectedEntry).length === 0 && sheet.newEntry === false) ?
    <div className="entry-details-container hidden"></div>
    :
    <>
      <div className="entry-details-container">

        <div className="entry-details-header no-select">
          <span>{sheet.newEntry === true ? 'New Entry' : 'Update Entry'}</span>
          <button className="entry-details-cancel cancel-desktop" onClick={() => {
            navigate(`/sheet/${location.pathname.split('/')[2]}`)
            sheet.setSelectedEntry({})
            sheet.setNewEntry(false)
          }}>&gt;</button>
          <button className="entry-details-cancel cancel-mobile" onClick={() => {
            navigate(`/sheet/${location.pathname.split('/')[2]}`)
            sheet.setSelectedEntry({})
            sheet.setNewEntry(false)
          }}>x</button>
          {/* <img alt='edit icon'/> */}
        </div>

        <form className='entry-details-form'>
          {sheet.currentSheet.fields.map((field, i) => {
            // map through each field of the sheet and try to get the corresponding value from the selected entry
            let index;
            if (sheet.newEntry === false) {
              index = sheet.selectedEntry.values.findIndex(value => value.field_id === field.field_id)
            } else {
              index = -1; // values won't exist for a new entry
            }
            return (
              <div key={i} data-field={JSON.stringify(field)} className='entry-details-field' onClick={(e)=> {
                  const el = e.currentTarget.getElementsByClassName('entry-details-input')[0];
                  el.focus()
                }}
                onFocus={(e)=>{
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
                {field.type === 'checkbox' ? 
                  <div className='entry-details-checkbox-row'>
                    <input id={`${field.field_id}_${index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}`}
                      key={index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}
                      className='entry-details-checkbox'
                      type="checkbox" defaultChecked={index === -1 ? false : sheet.selectedEntry.values[index].value === 'true'}
                      onChange={(e) => {
                        let element = e.target.nextSibling;
                        element.innerText = element.innerText === 'Yes' ? 'No' : 'Yes';
                      }}
                    />
                    <div className='entry-details-checkbox-text'>
                      {index === -1 ? 'No' : (sheet.selectedEntry.values[index].value === 'true' ? 'Yes' : 'No')}
                    </div>
                  </div>
                  :
                  <input id={`${field.field_id}_${index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}`}
                    key={index === -1 ? 'new' : sheet.selectedEntry.values[index].value_id}
                    className='entry-details-input'
                    defaultValue={index === -1 ? '': sheet.selectedEntry.values[index].value} />
                }
                <div className='entry-field-line' />
              </div>
              )
            }
          )}
        </form>

        <button className='entry-details-update no-select' onClick={async (e) => {
          e.preventDefault()
          submitData();
          toast.success('Entry Updated')
        }}>Submit</button>

        {/* Covers the entire component after data is submitted. */}
        {isLoading === true ? <div className="entry-details-loader">Please Wait...</div> : <></>}
      </div>
      <Div className="entry-details-underlay" fills onClick={
        () => {
            navigate(`/sheet/${location.pathname.split('/')[2]}`)
            sheet.setSelectedEntry({})
            sheet.setNewEntry(false)
          }}>
      </Div>
      <Div className="entry-details-underlay-sidebar" fills onClick={
        () => {
            navigate(`/sheet/${location.pathname.split('/')[2]}`)
            sheet.setSelectedEntry({})
            sheet.setNewEntry(false)
          }}>
      </Div>
    </>
  )
}

export default EntryDetails;