import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import config from '../config.js'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import TaskCard from "./TaskCard.js";
import { Stack } from "@mui/material";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

/*
const useStyles = makeStyles((theme) => ({
  column: {
    border: '4px solid black',
    textAlign: 'center',
  },
  container: {
    border: '4px solid black',
  }
}))*/

const dummy = [
  { id: 1, title: "dummy", status: "Backlog", priority: 1, suspense_date: "now", created_by: "rank/firstname/lastname", assigned_to: 'Sp4 Jones' },
  { id: 2, title: "dummy", status: "To Do", priority: 1, suspense_date: "now", created_by: "rank/firstname/lastname", assigned_to: 'Sp4 Jones' },
  { id: 3, title: "dummy", status: "In Progress", priority: 1, suspense_date: "now", created_by: "rank/firstname/lastname", assigned_to: 'Sp4 Jones' }]

const userColumns = ["Backlog", "To Do", "In Progress", "Created"]
const unitColumns = ["Backlog", "To Do", "In Progress"]

const Dashboard = ({ user }) => {

  //const classes = useStyles()
  // let [columns, setColumns] = useState([])

  // useEffect(() => {
  //   user ? setColumns(userColumns) : setColumns(unitColumns)
  // }, [])

  return (
    
      <div>
        Dis supposed to be a grid

        {
          // for each status column
          unitColumns.map((colName) => {
            return (
              <>{
                dummy.map((element) => {
                  return (
                    element.status === colName) ?

                    <TaskCard
                      title={element.title}
                      status={element.status}
                      suspense_date={element.suspense_date}
                      priority={element.priority}
                      assigned_to={element.assigned_to}
                    />

                    :

                    <></>
                })}
                
                </>
            )
          })
        }
         </div>
    
      )
}

      export default Dashboard

/*

 <div>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
          {
            unitColumns.map((colName) => {
              <Stack>
                <Typography>{colName}</Typography>
                {
                  dummy.map((element) => {
                    
                    if (element.status === colName) {
                        {console.log(element)}
                      <TaskCard 
                        title={element.title} 
                        status={element.status} 
                        suspense_date={element.suspense_date} 
                        priority={element.priority} 
                        assigned_to={element.assigned_to}
                      />
                    }
                  })
                }
              </Stack>
            })
          }
        </Grid>
      </div>
*/