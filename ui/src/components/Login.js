import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

const Login = () => {
  let [input, setInput] = useState({})
  const tc = useContext(TaskContext);

  console.log(tc.setUserId);

  const handleSubmit = () => {
    console.log("success")
    console.log(tc.userId)
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    });
    e.preventDefault();
  }

  useEffect(() => {
    //placeholder for now
    tc.setUserId(1);
  },[]);

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginBottom: "0",
        boxShadow: "0 0 10px rgb(10, 31, 10)",
        borderRadius: "5px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box m={2} pt={3}>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box m={2} pt={3}>
              <Typography variant="h5">Login</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Username"
                name="username"
                value={input.username}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
