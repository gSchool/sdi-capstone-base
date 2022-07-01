import React, { useContext } from 'react';
import { SheetContext } from '../../_context/SheetProvider';

const Entry = (props) => {
  const { sheet } = useContext(SheetContext);
  let entry = props.data;

  return (
    <tr className="entry-row" key={entry.id} onClick={() => {sheet.setSelectedEntry(entry)}}>
      {sheet.currentSheet.fields.map((field, i) => {
        let index = entry.values.findIndex(value => value.field_id === field.field_id)
        return index === -1 ? <td key={i} className="sheet-display-cell"></td>:<td key={i} className="sheet-display-cell">{entry.values[index].value}</td>
      })}
    </tr>
  )
}

export default Entry;