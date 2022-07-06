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

import { TaskContext } from "../App.js";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

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
    author_id: 2,
    assigned_to: "Sp4 Jones",
  },
];

const userColumns = ["not started", "in progress", "Created"]; //CHANGE "not started" TO "to do"
const unitColumns = ["not started", "in progress"];

const Dashboard = ({ user }) => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [isLoading, setIsLoading] = useState(null); //use this to make loading circle
  let [columns, setColumns] = useState([]);

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
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {columns.map((colName) => {
          return (
            <Box marginTop={7}>
              <Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <Typography variant="h4">{formatColumn(colName)}</Typography>
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
