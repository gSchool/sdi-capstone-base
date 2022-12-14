import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert, FormControl } from "@mui/material";
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { Context } from '../../App';
import config from '../../config'
import { ConstructionOutlined } from "@mui/icons-material";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;




// const handleLoginClose = (setLoginOpen) => {
//     setLoginOpen(false);

// }

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}

const handleLogin = async(username, password, setUser) => {
    
    console.log('Account Username: ', username);
    console.log('Account Password: ', password);

    // let user = await axios.post(ApiUrl+'/login',{
    //     username:username,
    //     password:password
    // }, {withCredentials:true});

    let res = await fetch(ApiUrl + '/login', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username, password:password}),
      });

      res = await res.json();



    console.log('Authenticated user:', res);
    // setUser(res.data.user);


}

const Login = ({ showLogin }) => {
    const { authenticatedUser, setAuthenticatedUser } = useContext(Context);

    const handleLoginClose = () => {
        setLoginOpen(false);
        showLogin(false);
    }
    const [loginOpen, setLoginOpen] = useState(true);
 
    const [accountUsername, setAccountUsername] = useState("");
    const [accountPassword, setAccountPassword] = useState("");

    useEffect(() => {//component did mount
        setLoginOpen(true);

    }, [])

    return(
        <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        >
            <Box>
                <Typography>
                    Log in to account below
                </Typography>

                <Stack justifyContent="center" spacing={4}>
                    <FormControl variant="filled" sx={loginStyle}>
                        <TextField onChange={(e) => {setAccountUsername(e.target.value)}} id="username" variant="outlined" label="username"></TextField>
                        <TextField onChange={(e) => {setAccountPassword(e.target.value)}} id="password" variant="outlined" label="password"></TextField>
                        <Button onClick={(e) => handleLogin(accountUsername, accountPassword, setAuthenticatedUser)}>LOG IN</Button>
                    </FormControl>
                    {/* <TextField onChange={(e) => {setAccount(e.target.value)}} id="username" variant="outlined" label="Username" />
                    <TextField onChange={(e) => {setPassword(e.target.value)}} id="password" variant="outlined" label="Password" />
                    <Button onClick={(e) => handleLoginSubmit(setVerifiedUser, username, password, setLoginModalOpen, setLoggedInUser, navigate, logInSet, setFailedLogin)} variant="contained" >SUBMIT</Button> */}

                </Stack>

            </Box>



        </Modal>

    );

}

export default Login;