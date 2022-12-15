import '../App.css'
import { Box, Container, Stack } from '@mui/material';
import  { useState } from "react";
import Blank from '../components/Blank';
import Login from '../components/modals/Login';
import CreateAccount from '../components/modals/CreateAccount';
import { Button, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const handleLogin = (show) =>{
  show(true);
}

const handleCreate = (show) =>{
  show(true);
}

const Home = () => {
  let [showLogin, setShowLogin] = useState(false);
  let [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <div className='Home'>
      <Container>
        <Box sx={{width:'100%', textAlign: 'center', paddingTop: '50px'}} >
          <Typography variant='h4'>
            Welcome to
          </Typography>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}> 
            <Typography variant="h1" fontWeight="bold">
              OnDeck
            </Typography>
            <Typography variant="h1" fontWeight="bold" fontSize={110} sx={{}}>
              <EventIcon fontSize='inherit'/>
            </Typography>
          </div>
          <Typography variant='h4'>
            Assisting with the USSF's 24/7 365 Mission
          </Typography>
        </Box>
        <Stack justifyContent="center" direction="row" spacing={2} sx={{paddingTop: '50px'}}>
          <Button onClick={(e) => handleLogin(setShowLogin)} variant='contained' size='large'> LOG IN</Button>
          <Button onClick={(e) => handleCreate(setShowCreateAccount)} variant='contained' size='large'> Create Account</Button>
        </Stack>
        {showLogin ? <Login showLogin={setShowLogin} /> : <Blank/>}
        {showCreateAccount ? <CreateAccount showCreate={setShowCreateAccount} /> : <Blank/>}
      </Container>
    </div>
  );
}

export default Home;