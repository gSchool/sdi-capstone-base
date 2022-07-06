import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import config from "../config";
// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
const ApiUrl = 'http://localhost:8080/tasks/2'
/*
scroll container for comments?
*/

const dummyComments = [
  {
    id: 1,
    body: "This is the first Comment",
    user_id: 3,
    timestamp: "now",
  },
  {
    id: 2,
    body: "This is the Second Comment",
    user_id: 1,
    timestamp: "now",
  },
  {
    id: 3,
    body: "This is the reply to the first comment",
    user_id: 1,
    timestamp: "now",
  },
];

const dummyOwners = [
  { rank: "Lt", name: "I dont know" },
  { rank: "Spc1", name: "I dont know" },
];

const dummy = {
  id: 1,
  title: "no u",
  description: "got em",
  assigned_date: "a year ago",
  suspense_date: "now",
  completed_date: "n/a",
  status: "In Progress",
  owner: dummyOwners,
  created_by_rank: "Spc3",
  created_by_name: "Lauren Enders",
  comments: dummyComments,
}; //desription or body?

const TaskDetails = () => {
  /*
      Since the data is likely going to be a state, and i dont know if the Array.sort(), which sorts an array in place, is going
      to change the state so I'm assuming we will have a "comments" state variable that we can sort and render

      Also, change the fields to use Editable Text if the userId is equal to the userId of the task
  */

  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  const { taskDetails, setTaskDetails } = useState();
  
  //have this be inside useEffect, handle the same way as sorting for Project 3!!
  let sortedComments = sortComments();
  
  const sortComments = () => {
    let commentArray = taskDetails.comments; //maybe have to do a deep copy?
    commentArray.sort(compare);
    return commentArray;
  };

  //let { id } = useParams(); ${id}

  useEffect(() => {
    fetch(ApiUrl + `/tasks/2`)
      .then((res) => res.json())
      .then((data) => setTaskDetails(data))
      .then((data) => console.log(`tasks: ${tasks}`))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography>{`Title: ${taskDetails.title}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Priority: ${taskDetails.priority}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Status: ${taskDetails.status}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Assigned Date: ${taskDetails.task_assigned_date}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Suspense Date: ${taskDetails.task_suspense_date}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Description: ${taskDetails.description}`}</Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            {sortedComments.map((comment) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {comment.user_id}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.body}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {comment.timestamp}
                      </p>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default TaskDetails;
