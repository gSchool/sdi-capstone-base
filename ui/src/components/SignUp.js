import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { TaskContext } from "../App.js";

const SignUp = () => {
  const tc = useContext(TaskContext);
  let [input, setInput] = useState[{}]

  const handleSubmit = () => {
    console.log('Submitted! Now what does submit do?')
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    });
    e.preventDefault();
  }

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
              <Typography variant="h5">Register</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="First Name"
                type="fName"
                name="fName"
                value={input.fName}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Last Name"
                type="lName"
                name="lName"
                value={input.lName}
                onChange={handleChange}
                required="required"
              />
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
              Register
            </Button>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
