import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SheetContext } from '../../_context/SheetProvider';

const Entry = (props) => {
  const { sheet } = useContext(SheetContext);
  let entry = props.data;
  const { entryId } = useParams();
  const navigate = useNavigate();

  //TODO: Clean up these onClicks
  return (
    <tr className={`entry-row ${entry.entry_id === parseInt(entryId) ? 'entry-highlighted' : 'test'}`} key={entry.entry_id} id={entry.entry_id}>
      {sheet.currentSheet.fields.map((field, i) => {
        let index = entry.values.findIndex(value => value.field_id === field.field_id)
        if (field.type === 'checkbox') {
          return index === -1 ? 
            <td key={i} className="sheet-display-cell" onClick={() => {
              navigate(`/sheet/${sheet.currentSheet.sheet_id}/${entry.entry_id}`)
              // sheet.setSelectedEntry(entry);
              // sheet.setNewEntry(false);
              }}>
              <input type="checkbox" disabled/>
            </td>
            :
            <td key={i} className="sheet-display-cell" onClick={() => {
              navigate(`/sheet/${sheet.currentSheet.sheet_id}/${entry.entry_id}`)
              // sheet.setSelectedEntry(entry);
              // sheet.setNewEntry(false);
              }}>
              <input type="checkbox" checked={entry.values[index].value === 'true'} disabled/>
            </td>
        } else {
          return index === -1 ? <td key={i} className="sheet-display-cell" onClick={() => {
            navigate(`/sheet/${sheet.currentSheet.sheet_id}/${entry.entry_id}`)
            // sheet.setSelectedEntry(entry);
            // sheet.setNewEntry(false);
            }}></td>
          :
          <td key={i} className="sheet-display-cell" onClick={() => {
            navigate(`/sheet/${sheet.currentSheet.sheet_id}/${entry.entry_id}`)
            // sheet.setSelectedEntry(entry);
            // sheet.setNewEntry(false);
            }}>{entry.values[index].value}</td>
        }
      })}
      <td className="entry-row-option" onClick={() => {console.log(entry)}}>⋮</td>
    </tr>
  )
}

export default Entry;