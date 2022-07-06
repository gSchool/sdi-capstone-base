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
const dummy = {name:"Isaac", rank:'Gen', email:"isaac@gmail.com", organization:"Space Force"}

const Profile = () => {
    let [input, setInput] = useState({name:"", rank: "", email:"", organization:""})

    return(
        <Box m={2} p={1} textAlign={center}>
            <Stack>
                <Typography variant="h4">My Profile</Typography>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                                <Typography>Name:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                                <EditableText field={"name"} val={dummy.name} canEdit = {true} callback = {setInput} input = {input}/>
                        </Grid>
                        <Grid item xs={4}>
                                <Typography>Rank:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                                <EditableText field={"Rank"} val={dummy.rank} canEdit = {true} callback = {setInput} input = {input}/>
                        </Grid>
                        <Grid item xs={4}>
                                <Typography >Email:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                                <EditableText field={"email"} val={dummy.email} canEdit = {true} callback = {setInput} input = {input}/>
                        </Grid>
                        <Grid item xs={4}>
                                <Typography>organization:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                                <EditableText field={"organization"} val={dummy.organization} canEdit = {true} callback = {setInput} input = {input}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>
        </Box>
    )
};

export default Profile;
