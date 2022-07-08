import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../_context/AppProvider'
import { SheetContext } from '../../_context/SheetProvider';
import { Div } from '../../_styles/_global'
import Entry from './Entry';
import EntryDetails from './EntryDetails';
import logo from '../../_assets/img/logo-dark.png';
import dummyData from '../../_dummy/sheet.json';
import dummyData2 from '../../_dummy/sheet2.json'
import edit from '../../_assets/icons/edit-purple.png'
import useScrollHandler from '../../_helpers/useScrollHandler';

const SheetDisplay = () => {
  const navigate = useNavigate();
  const entryId = useParams.entryId;
  const location = useLocation();
  const mouseDownHandler = useScrollHandler('scroll-container');

  const { store } = useContext(GlobalContext)
  const { theme, isAuth, setIsAuth } = store

  const { sheet } = useContext(SheetContext);

  const { sheetId } = useParams();

  const { sheetPageView, setSheetPageView, setSelectedEntry, selectedEntry, newEntry, setCurrentSheet } = sheet;

  useEffect(() => {
    if (selectedEntry.entry_id > 0) {
      setSheetPageView('edit-entry');
    } else if (newEntry === true) {
      setSheetPageView('new-entry');
    } else if (selectedEntry.entry_id === undefined) {
      setSheetPageView('sheet');
    }
  }, [selectedEntry, newEntry])

  useEffect(() => {
    // get user's sheets here
    sheet.setSheetLoading(true)

    if (sheetId === '1') {
      sheet.setCurrentSheet(dummyData)
    } else if (sheetId === '100') {
      sheet.setCurrentSheet(dummyData2)
    } else {
      sheet.setSheetLoading(false)
    }
  }, [sheetId])

  useEffect(() => {
    sheet.setSheetLoading(false);
  }, [sheet.currentSheet])

  return (
    <>
      <div className={`sheet-display-container ${(sheetPageView === 'edit-entry' || sheetPageView === 'new-entry') ? 'shrink' : ''}`}>
        {/* <SheetHeader> */}
        <div className='sheet-display-header'>
          <div className="sheet-header-meta">
            <img className="sheet-header-icon no-select" src={logo} />
            <span className="nowrap">{sheet.currentSheet.name}</span>
          </div>
          <div className="sheet-search no-select">
            <input placeholder='Search'/>
            <button>Filter</button>
          </div>
        </div>
        <div id='scroll-container' className='sheet-display-body' onMouseDown={(e) => {
          sheet.clickTime.current = new Date();
          mouseDownHandler(e);
          }}>
          <table className='sheet-display-table'>
            {/* <SheetFields> */}
            <thead className='no-select'>
              <tr>
                {sheet.currentSheet.fields.map((field, i) =>
                  <td className="sheet-display-cell" key={i}>{field.name}</td>
                )}
                <td className="sheet-display-cell" key='option'></td>
              </tr>
            </thead>
            {/* <SheetEntries> */}
            <tbody>
              {sheet.currentSheet.entries.map((entry, i) => {
                return <Entry data={entry} key={i}/>
              })}
            </tbody>
          </table>
        </div>
        <button className="dummy-users-button" onClick={
          () => navigate(`/sheet/${sheet.currentSheet.sheet_id}/users`)}><img alt='edit-icon'/></button>
        <button className="new-entry no-select" onClick={() => sheet.setNewEntry(true)}><img alt='edit-icon'/></button>
      </div>
      <EntryDetails entryId={entryId}/>
    </>
  );
}

export default SheetDisplay;
//sidebar

//header
//fields
//entries

//detailed

{/* <tr key={entry.id} onClick={() => {console.log('test')}}>
{sheet.currentSheet.fields.map(field => {
  let index = entry.values.findIndex(value => value.field_id === field.field_id)
  return index === -1 ? <td></td>:<td>{entry.values[index].value}</td>
})}
</tr> */}
{/* <div className="sheet-display-container">
  <div className="sheet-display">
    <div className="sheet-header">{sheet.currentSheet.name}</div>
    {sheet.currentSheet.fields.map(field => {
      let count = 0;
      return (<div className="sheet-column" key={field.field_id}>
        <div className='field'>{field.name}</div>
        {sheet.currentSheet.entries.map(entry => {
          let index = entry.values.findIndex(value => value.field_id === field.field_id)
          let item = entry.values[index];
          count += 1;
          return <div className={`value ${count % 2 === 0 ? 'even':'odd'}`} key={item.value_id}>{item.value}</div>
        })}
      </div>
      )
    }
    )}
  </div>
</div>  */}

{/* <>
<Div flex column className="sheet-display-container">
  <Div flex row className="sheet-header">{sheet.currentSheet.name}</Div>
  <Div flex row className="sheet-fields">
    {sheet.currentSheet.fields.map(field =>
      <span className="field" key={field.id}>{field.name}</span>
    )}
  </Div>
  <Div flex column className="sheet-entries" >
    {sheet.currentSheet.entries.map(entry =>
      <Div flex row className="entry" key={entry.id}>
        {entry.values.map(value =>
          <span className="value" key={value.id}>{value.value}</span>
        )}
      </Div>
    )}
  </Div>
</Div>
</> */}