import '../App.css'

// import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
// import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Context } from '../App.js';

// import LogIn from "../components/modals/Login";
// import axios from 'axios';
// import {AdapterDayjs} from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { BurstMode } from "@mui/icons-material";

import config from '../config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

// const handleLogin = () => {
    
// }

// const handleCreateAccount = () => {
    
// }

// const handleAccountSubmit = async () => {
    
// }

// const accountCreation = async() => {
   
// }

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}



const Home = () => {
    // const { loggedInUser, setLoggedInUser } = useContext(Context);

    

    return (
        <div className='Home'>

        </div>
    );



}

export default Home;