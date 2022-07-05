import { useState } from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData = (task, date_completed, completed_by) => {
  return { task, date_completed, completed_by };
}

/*
*/
const rows = [
  createData('dont be a piece of shit', 'never', 'me >:D'),
  createData('un heck yourself trainee', 'tomorrow', 'me mum'),
  createData('get wrecked', "now", "ur MOM"),
];

const rowNames = ["Task", "Date Completed", "Completed By"]

const TaskTable = () => {

  let [data, setData] = useState([])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              rowNames.map((element, index) => {
                return (
                  index === 0 ? <TableCell key={index}>{element}</TableCell> : <TableCell key={index} align="right">{element}</TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
           
            {rows.map((row) => {
                return(
                    <>
                    <TableRow
                        key={row.task}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    {
                
                    Object.keys(row).map((colName,index) => {
                        console.log(`column:${colName}`)
                        console.log(`index:${index}`)
                        return(
                            index === 0 ? <TableCell key={`element${index}`} component="th" scope="row">{row[colName]}</TableCell> : <TableCell key={`element${index}`} align="right">{row[colName]}</TableCell>
                        )
                    })}
                    </TableRow>
                    </>
                )
            })}
            
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable