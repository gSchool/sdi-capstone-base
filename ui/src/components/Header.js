import '../App.css'
import { AppBar, Button, IconButton, Toolbar, Typography, Box } from "@mui/material";
import {useContext, useState} from 'react';
import { NavLink, useNavigate, Navigate, useSearchParams } from "react-router-dom";
import SvgIcon from '@mui/material/SvgIcon';

const HomeIcon = (props) => {
    return(
        <Box>
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>

        </Box>
    
    )
}

const handleReturnHome = () => {

}

const handleLogOut = () => {
    

}

const handleLogIn = () => {
    
    

}

const Header = () => {
    const navigate = useNavigate();
    
    let [logInModal, setLogInModal] = useState(false);

    return (
        

        <Box>
            <Box sx={{ flexGrow:1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton>
                            <HomeIcon size='large' sx={{mr:2}}></HomeIcon>
                        </IconButton>
                        <Typography variant="h4" component="div" sx={{flexGrow:1}}>
                                OnDeck
                        </Typography>
                        <Box>
                            <Typography>
                                User:
                            </Typography>
                        </Box>




                    </Toolbar>

                </AppBar>

            </Box>

        </Box>


    );

}

export default Header;