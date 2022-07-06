import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { TaskContext } from "../App.js";

const TaskCard = (props) => {
  console.log("here");
  // const navigate = useNavigate()

  const tc = useContext(TaskContext);

  const clickHandler = () => {
    tc.setSelectedTask(props.task);
    console.log("Need to navigation to TaskDetails endpoint");
  };

  const card = (
    <>
      <Box m={1}>
        <Typography align="right" sx={{ fontSize: 11 }} color="text.secondary">
          Suspense: {props.suspense_date}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h5" align="center">
          Title:{props.title}
        </Typography>
        <Typography sx={{ fontSize: 11 }} color="text.primary" align="center">
          Priority Level:{props.priority}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHandler}>
          View Details
        </Button>
      </CardActions>
    </>
  );

  return (
    <Box sx={{ maxWidth: 300, minWidth: 300, minHeight: 180 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default TaskCard;

