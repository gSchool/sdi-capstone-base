import { useState, useEffect, useContext } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import config from "../config";
import { TaskContext } from "../App.js";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const createData = (task, date_completed, completed_by) => {
  return { task, date_completed, completed_by };
};

/*
 */
const rows = [
  createData("dont be a piece of shit", "never", "me >:D"),
  createData("un heck yourself trainee", "tomorrow", "me mum"),
  createData("get wrecked", "now", "ur MOM"),
];

//variables here can probably have better names, these are the possible names of the columns
const rowNames = ["Task", "Date Completed", "Completed By"];
const adminRoles = [];
const adminOrgs = [];

const TaskTable = (props) => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [isUnit, setIsUnit] = useState(true); //make toggle button to toggle if the table should show unit data or single user data

  function isDateInThisWeek(date) { //assumes date is a Date objct
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  
    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  
    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  useEffect(() => {
    let url;
    isUnit ? (url = `${ApiUrl}/war/orgs/${tc.userOrg}`) : (url = `${ApiUrl}/war/users/${tc.userOrg}`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => sortTasks(data));
  }, [isUnit]);

  const sortTasks = (data) => {
    let temp = [];
    if (props.isArchive) {
      //if its archived then the completed date is not null
      temp = data.filter((element) => element.task_completed_date !== null);
    } else {
      //if its not archived then get the tasks that are completed for the week or in progress
      //Note: I dont know if this date sorting is gonna work
      temp = data.filter((element) => {element.task_status === 'in progress' && isDateInThisWeek(element.task_completed_date)})
    }
    setTasks(temp);
  };

  return (
    <Box width={"90%"} margin="auto" marginTop={5}>
      <Paper>
        <Box m={3}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  setIsUnit(!isUnit);
                }}
              />
            }
            label="See my personal report"
          />
        </FormGroup>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rowNames.map((element, index) => {
                  return index === 0 ? (
                    <TableCell key={index}>
                      <Typography >{element}</Typography>
                    </TableCell>
                  ) : (
                    <TableCell key={index} align="right">
                      <Typography>{element}</Typography>
                   </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <>
                    <TableRow
                      key={row.task}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.keys(row).map((colName, index) => {
                        console.log(`column:${colName}`);
                        console.log(`index:${index}`);
                        return index === 0 ? (
                          <TableCell
                            key={`element${index}`}
                            component="th"
                            scope="row"
                          >
                          {row[colName]}
                          </TableCell>
                        ) : (
                          <TableCell key={`element${index}`} align="right">
                            {row[colName]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TaskTable;
