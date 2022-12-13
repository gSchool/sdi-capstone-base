import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate, useSearchParams } from "react-router-dom";


import axios from 'axios';

import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const handleLoginSubmit = async(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser, navigate, logInSet, setFailedLogin) => {    
    console.log('LOGIN SUBMIT')
    if(await validLogin(username, password, setLoggedInUser)){//succesful login
        setVerifiedUser(true);
        setLoginModalOpen(true);
        
        logInSet(false);
        
        navigate('/InventoryManager');
        //set login modal to false here.

    }
    else{//bad login attempt
        setVerifiedUser(false);
        setFailedLogin(true);
    }
}

const validLogin = async(usernameInput, passwordInput, setLoggedInUser) => {
    console.log('valid log in called');
    console.log('username input:', usernameInput);
    console.log('query paramaeters url endpoint', ApiUrl, '/login' );
    let usernameResponse = await axios.get(ApiUrl+ '/login',  {
        params: {
            username: usernameInput,
            password: passwordInput
        }
    });
    console.log('usernameResponse: ', usernameResponse);
    
    if(usernameResponse.data.length !== 0 ){// A user account exits!
        setLoggedInUser(usernameResponse.data[0]);
        

        return true;
    }
    else {
        return false;
    }
}

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}

const LogIn = ({ logInSet }) => {
    
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(Context);
    let [loginModalOpen, setLoginModalOpen] = useState(true);
    const handleCloseLogin = () => {
        setLoginModalOpen(false);
        logInSet(false);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);


    return (
        <Modal
            open={loginModalOpen}
            onClose={handleCloseLogin}
            >
            <Box sx={loginStyle}>
            <Typography variant="h6">
                This is the login modal
            </Typography>
            <Stack justifyContent="center" spacing={2}>
                <TextField onChange={(e) => {setUsername(e.target.value)}} id="username" variant="outlined" label="Username" />
                <TextField onChange={(e) => {setPassword(e.target.value)}} id="password" variant="outlined" label="Password" />
                <Button onClick={(e) => handleLoginSubmit(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser, navigate, logInSet, setFailedLogin)} variant="contained" >SUBMIT</Button>

            </Stack>

            {failedLogin ?
                <Box>
                    <Alert severity="warning"> Account Could not be verified</Alert>

                </Box>
            
                :
                <React.Fragment/>
                
            }


            </Box>

    </Modal>
    )


}

export default LogIn;