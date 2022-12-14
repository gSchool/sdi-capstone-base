import { Box, Typography, Button, Stack, Modal, TextField,  FormControl} from "@mui/material";
import { useState } from "react"
import RankSelect from "../RankSelect";
import PositonSelector from "../PositionSelector";
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const loginStyle = {
  postion: 'absolute',
  width: '50%',
  bgcolor: 'background.paper',
  margin: 'auto',
}

const CreateAccount = ({ showCreate }) => {
  const [createAccountOpen, setCreateAccountOpen] = useState(true);
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
      <Box>
        <Typography>
            Log in to account below
        </Typography>   
        <Stack justifyContent="center" spacing={4}>
          <form onSubmit={handleSubmit}>
            <FormControl  variant="filled" sx={loginStyle}>
              <TextField onChange={handleChange} id="first-name" variant="outlined" label="First Name" name='first_name'></TextField>
              <TextField onChange={handleChange} id="last-name" variant="outlined" label="Last Name" name='last_name'></TextField>
              <TextField onChange={handleChange} id="phone-num" variant="outlined" label="Phone Num" name='phone_number'></TextField>
              <TextField onChange={handleChange} id="email" variant="outlined" label="email" name='email'></TextField>
              <FormControl>
                <RankSelect handleChange={handleChange} account={account}/>
              </FormControl>
              <FormControl>
                <PositonSelector handleChange={handleChange} account={account}/>
              </FormControl>
              <TextField onChange={handleChange} id="username" variant="outlined" label="username" name='username'></TextField>
              <TextField onChange={handleChange} id="password" type='password' variant="outlined" label="password" name='password'></TextField>
              <Button type='submit'>CREATE ACCOUNT</Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Modal>
  );


}

export default CreateAccount;