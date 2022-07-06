import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.js";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import TaskCard from "./TaskCard.js";
import { Stack } from "@mui/material";

import { TaskContext } from "../App.js";

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
  {
    id: 1,
    title: "dummy",
    status: "Backlog",
    priority: 1,
    suspense_date: "now",
    created_by: "rank/firstname/lastname",
    assigned_to: "Sp4 Jones",
  },
  {
    id: 2,
    title: "dummy",
    status: "To Do",
    priority: 1,
    suspense_date: "now",
    created_by: "rank/firstname/lastname",
    assigned_to: "Sp4 Jones",
  },
  {
    id: 3,
    title: "dummy",
    status: "In Progress",
    priority: 1,
    suspense_date: "now",
    created_by: "rank/firstname/lastname",
    assigned_to: "Sp4 Jones",
  },
];

const userColumns = ["Backlog", "To Do", "In Progress", "Created"];
const unitColumns = ["Backlog", "To Do", "In Progress"];

const Dashboard = ({ user }) => {

  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([])
  let [isLoading, setIsLoading] = useState(null) //use this to make loading circle
  let [columns, setColumns] = useState([])

  useEffect(()=>{

    user ? getUrl = `${ApiUrl}users/${tc.userId}` : getUrl = `${ApiUrl}orgs/${tc.orgId}`
    user ? setColumns(userColumns) : setColumns(unitColumns)

        setIsLoading(true);
        fetch(getUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTasks(data)
                setIsLoading(false);
                if (user){
                    console.log(userId)
                }
            })
        
    },[user])

  //const classes = useStyles()
  // let [columns, setColumns] = useState([])

  // useEffect(() => {
  //   user ? setColumns(userColumns) : setColumns(unitColumns)
  // }, [])

  return (
    <div>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
      {unitColumns.map((colName) => {
        return (
        <Stack>
          <Typography>{colName}</Typography>
          {
            dummy.map((element) => {
              return 
                element.

                element.task_status === colName ? 

                <TaskCard
                  title={element.task_title}
                  status={element.task_status}
                  suspense_date={element.task_suspense_date}
                  priority={element.task_priority}
                />
              : 
                <></>
              ;
            })
          }
        </Stack>
        )
      })}
    </Grid>
    </div>
  );
};

export default Dashboard;

