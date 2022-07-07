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
import { Divider } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { TaskContext } from "../App.js";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const dummy = [
  {
    task_id: 1,
    task_title: "dummy",
    task_status: "Backlog",
    task_priority: 1,
    task_suspense_date: "now",
    task_created_by: "rank/firstname/lastname",
    task_assigned_to: "Sp4 Jones",
  },
  {
    task_id: 2,
    task_title: "dummy",
    task_status: "in progress",
    task_priority: 1,
    task_suspense_date: "now",
    task_created_by: "rank/firstname/lastname",
    task_assigned_to: "Sp4 Jones",
  },
  {
    task_id: 3,
    task_title: "dummy",
    task_status: "in progress",
    task_priority: 1,
    task_suspense_date: "now",
    task_author_id: 2,
    task_assigned_to: "Sp4 Jones",
  },
];

const userColumns = ["to do", "in progress", "Created"]; //created is current user is author and sole owner
const unitColumns = ["to do", "in progress"];

const Dashboard = ({ user }) => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [isLoading, setIsLoading] = useState(null); //use this to make loading circle
  let [columns, setColumns] = useState([]);
  let navigate = useNavigate()

  const formatColumn = (someWords) => {
    const words = someWords.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  };

  useEffect(() => {
    let getUrl;
    user
      ? (getUrl = `${ApiUrl}/tasks/users/${tc.userId}`)
      : (getUrl = `${ApiUrl}/tasks/orgs/${tc.userOrg}`);
    user ? setColumns(userColumns) : setColumns(unitColumns);

    setIsLoading(true);
    fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
        if (user) {
          console.log(userId);
        }
      });
  }, [user]);

  //const classes = useStyles()
  // let [columns, setColumns] = useState([])

  //ONCE WE HAVE MERGED, IN THIS RETURN CHANGE

  return (
    <div>
      <Box m = {4} display='flex' justifyContent='right'>
        <Fab color="primary" aria-label="add" onClick={() => navigate('/tasks/add')}>
          <AddIcon />
        </Fab>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {columns.map((colName) => {
          return (
            <Box style={{ height: 100 }}>
              <Stack spacing={2} alignItems="center">
                  <Typography
                    variant="h4"
                  >
                    {formatColumn(colName)}
                  </Typography>
                {tasks.map((element) => {
                  return colName === "Created" &&
                    element.author_id === tc.userId ? (
                    <TaskCard
                      id={element.task_id}
                      title={element.task_title}
                      status={formatColumn(element.task_status)}
                      suspense_date={element.task_suspense_date}
                      priority={element.task_priority}
                    />
                  ) : element.task_status === colName ? (
                    <TaskCard
                      id={element.task_id}
                      title={element.task_title}
                      status={element.task_status}
                      suspense_date={element.task_suspense_date}
                      priority={element.task_priority}
                    />
                  ) : (
                    <></>
                  );
                })}
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
