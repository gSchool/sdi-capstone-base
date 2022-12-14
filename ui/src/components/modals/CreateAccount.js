import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert, FormControl, MenuItem, Select, CircularProgress } from "@mui/material";
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import RankSelect from "../RankSelect";
import PositonSelector from "../PositionSelector";
import { Context } from '../../App';
import Blank from "../Blank";
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const loginStyle = {
    postion: 'absolute',
    width: '50%',
    bgcolor: 'background.paper',
    margin: 'auto',
    
}

const handleCreateAccount = async(account, setLoading) => {
    console.log('Account Information:', account);
    setLoading(true);
    let createdAccount = await axios.post(ApiUrl+'/register', account );
    console.log('Response from server', createdAccount);


    setTimeout(() => {
        setLoading(false);
    }, 1000);

}



const CreateAccount = ({ showCreate }) => {
    const { authenticatedUser, setAuthenticatedUser } = useContext(Context);
    
    const handleAccountCLose = () => {
        setCreateAccountOpen(false);
        showCreate(false);
    }
    const [createAccountOpen, setCreateAccountOpen] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

    const [account, setAccount] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        email:"",
        rank:"",
        username:"",
        password:"",
        role:"member"

    });
 
    const [create_firstName, setCreate_firstName] = useState("");
    const [create_lastName, setCreate_lastName] = useState("");
    const [create_phoneNum, setCreate_phoneNum] = useState("");
    const [create_email, setCreate_email] = useState("");
    const [create_rank, setCreate_rank] = useState("");
    const [create_username, setCreate_username] = useState("");
    const [create_password, setCreate_password] = useState("");
    const [create_crewPosition, setCreate_crewPosition] = useState("");



    useEffect(() => {//component did mount
        setCreateAccountOpen(true);

    }, [])

    useEffect(() => {
        setAccount({
            first_name:create_firstName,
            last_name:create_lastName,
            phone_number:create_phoneNum,
            email:create_email,
            rank:create_rank,
            username:create_username,
            password:create_password,   
            crew_position_id:create_crewPosition,
            role:'member'
        })

    }, [create_firstName, create_lastName, create_phoneNum, create_email, create_rank, create_username, create_password, create_crewPosition])

    return(
        <Modal
        open={createAccountOpen}
        onClose={handleAccountCLose}
        >
            <Box>
                <Typography>
                    Log in to account below
                </Typography>   

                <Stack justifyContent="center" spacing={4}>
                    <FormControl  variant="filled" sx={loginStyle}>
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_firstName(e.target.value)}} id="first-name" variant="outlined" label="First Name"></TextField>
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_lastName(e.target.value)}} id="last-name" variant="outlined" label="Last Name"></TextField>
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_phoneNum(e.target.value)}} id="phone-num" variant="outlined" label="Phone Num"></TextField>
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_email(e.target.value)}} id="email" variant="outlined" label="email"></TextField>
                        <FormControl>
                            <RankSelect disabled={createLoading} setRank={setCreate_rank} />
                        </FormControl>
                        
                        
                        <FormControl>
                            <PositonSelector disabled={createLoading} setPosition={setCreate_crewPosition} />
                        </FormControl>
                        
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_username(e.target.value)}} id="username" variant="outlined" label="username"></TextField>
                        <TextField disabled={createLoading} onChange={(e) => {setCreate_password(e.target.value)}} id="password" variant="outlined" label="password"></TextField>
                        
                        <Button onClick={(e) => handleCreateAccount(account, setCreateLoading)}>CREATE ACCOUNT</Button>
                    </FormControl>
                    

                </Stack>
                {createLoading ? <CircularProgress /> : <Blank/>}

            </Box>



        </Modal>

    );


}

export default CreateAccount;