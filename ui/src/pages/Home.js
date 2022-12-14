import '../App.css'
import { Box, Container, Stack } from '@mui/material';
import  { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Context } from '../App.js';
import Blank from '../components/Blank';
import Login from '../components/modals/Login';
import CreateAccount from '../components/modals/CreateAccount';
import config from '../config'
import { Button, Paper, Typography } from '@mui/material';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const handleLogin = (show) =>{
  console.log('Log in clicked');
  show(true);
}

const handleCreate = (show) =>{
  console.log('Create Account clicked');
  show(true);
}

const Home = () => {
  // const { loggedInUser, setLoggedInUser } = useContext(Context);
  let [showLogin, setShowLogin] = useState(false);
  let [showCreateAccount, setShowCreateAccount] = useState(false);
  let navigate = useNavigate();
  let userbox = "";
  let passwordbox = "";

  return (
    <div className='Home'>
      <Container>
        <Paper elevation={3}>
          <Box sx={{width:'100%'}} >
            <Typography variant='h2'>
                
            </Typography>
            <Typography variant='h4'>
              Welcome to OnDeck. Assisting with the USSF's 24/7 365 Mission
            </Typography>
            <Typography variant='h4'> _</Typography>
          </Box>
          <Stack justifyContent="center" direction="row" spacing={2}>
            <Button onClick={(e) => handleLogin(setShowLogin)} variant='contained'> LOG IN</Button>
            <Button onClick={(e) => handleCreate(setShowCreateAccount)} variant='contained'> Create Account</Button>
          </Stack>
        </Paper>
        {showLogin ? <Login showLogin={setShowLogin} /> : <Blank/>}
        {showCreateAccount ? <CreateAccount showCreate={setShowCreateAccount} /> : <Blank/>}
      </Container>
    </div>
  );
}

export default Home;