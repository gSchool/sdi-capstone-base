import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

const Register = () => {
  const tc = useContext(TaskContext);
  const navigate = useNavigate();

  let [input, setInput] = useState({
    rank: "",
    name: "",
    email: "",
    password: "",
    position: "",
  });

  const handleChange = (e) => {
    // sets Input state depending on what the user inputted into registration fields
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    // sends post request with input state info to API when user clicks submit/register
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify(input),
    };
    fetch(`${ApiUrl}/register`, request)
      .then((res) => res.json())
      .then((data) => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to register new user`);
      });
    e.preventDefault();
  };

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
              <Typography variant="h5">Register Here</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Name"
                type="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Rank"
                type="rank"
                name="rank"
                value={input.rank}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required="required"
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Position"
                name="position"
                value={input.position}
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

export default Register;
