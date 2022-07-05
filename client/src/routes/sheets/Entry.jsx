import React, { useContext } from 'react';
import { SheetContext } from '../../_context/SheetProvider';

const Entry = (props) => {
  const { sheet } = useContext(SheetContext);
  let entry = props.data;

  return (
    <tr className="entry-row" key={entry.id} onClick={() => {
      sheet.setSelectedEntry(entry);
      sheet.setNewEntry(false);
      }}>
      {sheet.currentSheet.fields.map((field, i) => {
        let index = entry.values.findIndex(value => value.field_id === field.field_id)
        if (field.type === 'checkbox') {
          return index === -1 ? 
            <td key={i} className="sheet-display-cell">
              <input type="checkbox" disabled/>
            </td>
            :
            <td key={i} className="sheet-display-cell">
              <input type="checkbox" checked={entry.values[index].value === 'true'} disabled/>
            </td>
        } else {
          return index === -1 ? <td key={i} className="sheet-display-cell"></td>:<td key={i} className="sheet-display-cell">{entry.values[index].value}</td>
        }
      })}
    </tr>
  )
}

export default Entry;