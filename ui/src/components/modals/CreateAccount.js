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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly'
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
      <Box sx={style}> 
        <Stack justifyContent="center" spacing={4}>
          <form onSubmit={handleSubmit}>
            <FormControl  variant="filled">
              <TextField onChange={handleChange} id="first-name" variant="outlined" label="First Name" name='first_name' required error={!valid}></TextField>
              <TextField onChange={handleChange} id="last-name" variant="outlined" label="Last Name" name='last_name' required error={!valid}></TextField>
              <TextField onChange={handleChange} id="phone-num" variant="outlined" label="Phone Num" name='phone_number' type='number' required error={!valid}></TextField>
              <TextField onChange={handleChange} id="email" variant="outlined" label="email" name='email' required type='email' error={!valid}></TextField>
              <FormControl>
                <RankSelect handleChange={handleChange} account={account}/>
              </FormControl>
              <FormControl>
                <PositonSelector handleChange={handleChange} account={account}/>
              </FormControl>
              <TextField onChange={handleChange} id="username" variant="outlined" label="username" name='username' required error={!valid}></TextField>
              <TextField onChange={handleChange} id="password" type='password' variant="outlined" label="password" name='password' required error={!valid}></TextField>
              <Button type='submit'>CREATE ACCOUNT</Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Modal>
  );


}

export default CreateAccount;