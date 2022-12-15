import { Context } from '../App';
import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert, FormControl, Grid, Card } from "@mui/material";
import { useState, useEffect, useContext } from "react"


import MyShifts from '../components/MyShifts';

const Member = () => {
    const { authenticatedUser, setAuthenticatedUser } = useContext(Context);


    return(
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <MyShifts />

                </Grid>
                <Grid item xs={12} lg={6}>
                    <MyShifts />

                </Grid>


            </Grid>

            <p>welcome {authenticatedUser.first_name}</p>
        </Container>
        
    )


}

export default Member;