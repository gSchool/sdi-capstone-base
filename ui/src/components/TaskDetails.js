import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
// import { useParams } from "react-router-dom";

import config from "../config";
// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
const ApiUrl = "http://localhost:8080";

/*
scroll container for comments?
*/

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

  const [taskDetails, setTaskDetails] = useState([]);
  const [comments, setComments] = useState([]);

  // let { id } = useParams();

  //let sortedComments = sortComments();

  const sortComments = (data) => {
    let commentArray = data; //maybe have to do a deep copy?
    commentArray.sort(compare);
    console.log(commentArray)
    setComments(commentArray)
  };

  useEffect(() => {
    fetch(ApiUrl + `/tasks/2`)
      .then((res) => res.json())
      .then((data) => {
        setTaskDetails(data[0]);
        setComments(data[0].comments)
        return data[0]
      })
      .then((data) => {
         sortComments(data.comments);
       })
      .catch((err) => console.log(err));
  }, []);

  //have this be inside useEffect, handle the same way as sorting for Project 3!!

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
              {console.log(taskDetails)}
              {console.log('comments', comments)}
              <Typography>{`Title: ${taskDetails.task_title}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Priority: ${taskDetails.task_priority}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Status: ${taskDetails.task_status}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Assigned Date: ${taskDetails.task_assigned_date}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`Suspense Date: ${taskDetails.task_suspense_date}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Description: ${taskDetails.task_description}`}</Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            {comments.map((comment) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {`${comment.user_rank} ${comment.user_name}`}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.comment_body}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {comment.comment_timestamp}
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
