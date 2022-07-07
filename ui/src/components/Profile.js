import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;



const Profile = () => {
  let [input, setInput] = useState({
    "user_id": 0,
    "user_name": "",
    "user_rank": "",
    "org_id": 0,
    "org_name": "",
    "user_email": ""
  });

  const tc = useContext(TaskContext);

  useEffect(() => {
    let url = `${ApiUrl}/users/${tc.userId}`
    fetch(url)
      .then(res => res.json())
      .then(data => setInput(data[0]))
  }, [])

  return (
    <Box m={2} p={1} alignItems="center">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" alignContent="left">
          My Profile
        </Typography>
        <Paper elevation={2}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end" >
              <Typography pt={3}>Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"name"}
                val={input.user_name}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Rank:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"Rank"}
                val={input.user_rank}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"email"}
                val={input.user_email}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Organization:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"organization"}
                val={input.org_name}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
          </Grid>
        </Paper>
        <Button>Submit Changes</Button>
      </Stack>
    </Box>
  );
};

export default Profile;
