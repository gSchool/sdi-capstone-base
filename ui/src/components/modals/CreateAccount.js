import { Box, Typography, Button, Stack, Modal, TextField,  FormControl} from "@mui/material";
import { useState } from "react"
import RankSelect from "../RankSelect";
import PositonSelector from "../PositionSelector";
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
};

const CreateAccount = ({ showCreate }) => {
  const [createAccountOpen, setCreateAccountOpen] = useState(true);
  const [valid, setValid] = useState(true);
  const [account, setAccount] = useState({
    first_name:"",
    last_name:"",
    phone_number:"",
    email:"",
    rank:"E1",
    username:"",
    password:"",
    role:"member",
    crew_position_id: 1,
  });

  const handleChange = (event) => {
    let newData = { ...account, [event.target.name]: event.target.value };
    setAccount(newData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValid(false);
    } else {
      try {
        let res = await fetch(ApiUrl + '/register', {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
        });
  
        let resJson = await res.json();
  
        if (res.status !== 201) {
          alert(resJson);
          return;
        }
  
        handleAccountClose();
      } catch(err) {
        console.log(err);
      }
    }
  }

  const handleAccountClose = () => {
    setCreateAccountOpen(false);
    showCreate(false);
  }

  return(
    <Modal
    open={createAccountOpen}
    onClose={handleAccountClose}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}> 
        <Typography sx={{textAlign: 'center', marginBottom: '20px'}} variant="h4" fontWeight='bold'>
          Register
        </Typography>
        <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginBottom: '20px'}}>
          <TextField onChange={handleChange} id="first-name" variant="outlined" label="First Name" name='first_name' required error={!valid}></TextField>
          <TextField onChange={handleChange} id="last-name" variant="outlined" label="Last Name" name='last_name' required error={!valid}></TextField>
        </Box>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="phone-num" variant="outlined" label="Phone Number" name='phone_number' type='number' required error={!valid}></TextField>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="email" variant="outlined" label="Email" name='email' required type='email' error={!valid}></TextField>
          <Box sx={{display: 'flex', flexDirection: "row", marginBottom: '20px', justifyContent: 'space-between'}}>
            <FormControl >
              <PositonSelector handleChange={handleChange} account={account} sx={{width: '100%'}}/>
            </FormControl>
            <FormControl sx={{width: '60%'}}>
              <RankSelect handleChange={handleChange} account={account}/>
            </FormControl>
          </Box>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="username" variant="outlined" label="Username" name='username' required error={!valid}></TextField>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="password" type='password' variant="outlined" label="Password" name='password' required error={!valid}></TextField>
          <Button type='submit' variant="contained" sx={{padding: '15px'}}>CREATE ACCOUNT</Button>
      </Box>
    </Modal>
  );


}

export default CreateAccount;