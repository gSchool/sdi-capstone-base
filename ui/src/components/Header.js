import '../App.css'
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../App';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Header = () => {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = await fetch(ApiUrl + '/logout', {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resJson = await res.json();

    if (res.status !== 202) {
      alert(resJson);
      return;
    }

    setUser(null);
    navigate('/');
  }
  
  return (
    <Box>
      <Box>
        <AppBar position="static" sx={{backgroundColor: '#393e46'}}>
          <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: "10px"}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}> 
              <Typography variant="h4" fontWeight="bold">
                OnDeck
              </Typography>
              <Typography variant="h4" fontWeight="bold" fontSize={40}>
                <EventIcon fontSize='inherit'/>
              </Typography>
            </div>
            { user ?
            (<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
              <Typography sx={{paddingRight: '5px'}} variant="h6">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography fontSize={25} sx={{paddingRight: '20px'}}>
                <AccountCircle fontSize='inherit'/>
              </Typography>
              <Button color="secondary" variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>) : null }
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );

}

export default Header;