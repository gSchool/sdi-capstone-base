import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem, InputLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

const Register = () => {
  const tc = useContext(TaskContext);
  const navigate = useNavigate();

  let [input, setInput] = useState({
    name: "",
    rank: "",
    email: "",
    position_id: 1,
    password: "",
  });

  const validRanks = [
    "CIV",
    "Spc 1",
    "Spc 2",
    "Spc 3",
    "Spc 4",
    "Sgt",
    "TSgt",
    "MSgt",
    "SMSgt",
    "CMSgt",
    "2d Lt",
    "1st Lt",
    "Capt",
    "Maj",
    "Lt Col",
    "Col",
    "Brig Gen",
    "Maj Gen",
    "Lt Gen",
    "Gen"
  ]

  const [password2, setPassword2] = useState('');
  const [feedback, setFeedback] = useState('');


  const handleChange = (e) => {
    // sets Input state depending on what the user inputted into registration fields
    if(validRanks.includes(e.target.value)){
      setInput({
        ...input,
        rank: e.target.value
      })
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;

    //resets feedback states to empty
    let tempFeedback = ''

    //data validation for each input field
    if(!input.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        tempFeedback += 'invalid email format\n';
        error = true;
    }
    if(input.password !== password2) {
      tempFeedback += 'passwords must match\n'
      error = true;
    }
    setFeedback(tempFeedback);
    if(error === false) {
      // sends post request with input state info to API when user clicks submit/register
      fetch(`${ApiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Registration successful!");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          alert(`Failed to register new user`);
        });
    }
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
              <Typography variant="body1" color="red">{feedback}</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Name"
                type="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                id="rank"
                select
                value={input.rank}
                label="Rank"
                onChange={handleChange}
                required
                sx={{minWidth: 223}}
                >
                {validRanks.map((rank, index) => <MenuItem key={index} value={rank}>{rank}</MenuItem>)}
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
                label="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Re-Enter Password"
                type="password"
                name="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                required
                maxLength={50}
              />
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Register
            </Button>
            <Link to={"/login"} style={{ textDecoration: 'none', color: "black" }}>
            <Typography variant="h6" >Already have an account? Click here to be taken to the login page!</Typography>
          </Link>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
