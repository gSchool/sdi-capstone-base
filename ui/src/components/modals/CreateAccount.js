import { Box, Typography, Button, FormHelperText, Modal, TextField,  FormControl} from "@mui/material";
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
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    phone_number: false,
    email: false,
    rank: false,
    username: false,
    password: false,
    role: false,
    crew_position_id: false,
  });
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

  const validate = () => {
    let output = true;
    let newError = {
      first_name: false,
      last_name: false,
      phone_number: false,
      email: false,
      rank: false,
      username: false,
      password: false,
      role: false,
      crew_position_id: false,
    }
    if (account.first_name.length === 0) {
      newError.first_name = true;
      output = false;
    }
    if (account.last_name.length === 0) {
      newError.last_name = true;
      output = false;
    }
    if (account.email.length === 0) {
      newError.email = true;
      output = false;
    }
    if (account.phone_number.length === 0) {
      newError.phone_number = true;
      output = false;
    }
    if (account.username.length === 0) {
      newError.username = true;
      output = false;
    }
    if (account.password.length === 0) {
      newError.password = true;
      output = false;
    }
    setError(newError);
    return output;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      console.log(error)
      event.stopPropagation();
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
        <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginBottom: '10px'}}>
          <FormControl>
            <TextField onChange={handleChange} id="first-name" variant="outlined" label="First Name" name='first_name' error={error.first_name}></TextField>
            <FormHelperText error={error.first_name} sx={{visibility: !error.first_name ? 'hidden':'visible'}}>First Name is Required</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField onChange={handleChange} id="last-name" variant="outlined" label="Last Name" name='last_name' error={error.last_name}></TextField>
            <FormHelperText error={error.last_name} sx={{visibility: !error.last_name ? 'hidden':'visible'}}>Last Name is Required</FormHelperText>
          </FormControl>
        </Box>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="phone-num" variant="outlined" label="Phone Number" name='phone_number' type='number' error={error.phone_number}></TextField>
            <FormHelperText error={error.phone_number} sx={{visibility: !error.phone_number ? 'hidden':'visible'}}>Phone Number is Required</FormHelperText>
          </FormControl>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="email" variant="outlined" label="Email" name='email' type='email' error={error.email}></TextField>
            <FormHelperText error={error.email} sx={{visibility: !error.email ? 'hidden':'visible'}}>Email is Required</FormHelperText>
          </FormControl>
          <Box sx={{display: 'flex', flexDirection: "row", marginBottom: '30px', justifyContent: 'space-between'}}>
            <FormControl >
              <PositonSelector handleChange={handleChange} account={account} sx={{width: '100%'}}/>
            </FormControl>
            <FormControl sx={{width: '60%'}}>
              <RankSelect handleChange={handleChange} account={account}/>
            </FormControl>
          </Box>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="username" variant="outlined" label="Username" name='username' error={error.username}></TextField>
            <FormHelperText error={error.username} sx={{visibility: !error.username ? 'hidden':'visible'}}>Username is Required</FormHelperText>
          </FormControl>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="password" type='password' variant="outlined" label="Password" name='password' error={error.password}></TextField>
            <FormHelperText error={error.password} sx={{visibility: !error.password ? 'hidden':'visible'}}>Password is Required</FormHelperText>
          </FormControl>
          <Button type='submit' variant="contained" sx={{padding: '15px'}}>CREATE ACCOUNT</Button>
      </Box>
    </Modal>
  );


}

export default CreateAccount;