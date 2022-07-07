import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import TaskContext from "../App.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

/*Get the userId from the TaskContext for the GET request from the server to populate the fields */
/*change dummy to a  */
const dummy = {
  name: "Isaac",
  rank: "Gen",
  email: "isaac@gmail.com",
  organization: "Space Force",
};

const Profile = () => {
  let [input, setInput] = useState({
    name: "",
    rank: "",
    email: "",
    organization: "",
  });

  return (
    <Box m={2} p={1} alignItems="center">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" alignContent="left">
          My Profile
        </Typography>
        <Paper elevation={2}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end" >
              <Typography>Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"name"}
                val={dummy.name}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography>Rank:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"Rank"}
                val={dummy.rank}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"email"}
                val={dummy.email}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography>Organization:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"organization"}
                val={dummy.organization}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
          </Grid>
        </Paper>
        <Button alignItems="right">Submit Changes</Button>
      </Stack>
    </Box>
  );
};

export default Profile;
