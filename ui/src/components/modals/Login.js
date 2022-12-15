import {  Box, Typography, Button, Modal, TextField, FormHelperText, FormControl } from "@mui/material";
import { useState, useContext } from "react"
import {  useNavigate } from "react-router-dom";
import { Context } from '../../App';
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

const Login = ({ showLogin }) => {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState({
    username: false,
    password: false
  });

  const validate = () => {
    let output = true;
    let newError = {
      username: false,
      password: false,
    }
    if (formData.username.length === 0) {
      newError.username = true;
      output = false;
    }
    if (formData.password.length === 0) {
      newError.password = true;
      output = false;
    }
    setError(newError);
    return output;
  }

  const handleLoginClose = () => {
      setLoginOpen(false);
      showLogin(false);
  }

  const handleChange = (event) => {
    let newData = { ...formData, [event.target.name]: event.target.value };
    setFormData(newData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      event.stopPropagation();
    } else {
      try {
        const res = await fetch(ApiUrl + '/login', {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const resJson = await res.json();

        if (res.status !== 202) {
          alert(resJson);
          return;
        }
        console.log('User:', resJson);

        setUser(resJson.user);
        //need logic to handle if user is a member or a leader
        resJson.user.role === 'leader' ? navigate('/leader') : navigate('/member');
        

        // navigate('/member');
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <Modal
      open={loginOpen}
      onClose={handleLoginClose}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography sx={{textAlign: 'center', marginBottom: '20px'}} variant="h4" fontWeight='bold'>
          Login
        </Typography>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="username" variant="outlined" label="Username" name="username" error={error.username}></TextField>
            <FormHelperText error={error.username} sx={{visibility: !error.username ? 'hidden':'visible'}}>Username is Required</FormHelperText>
          </FormControl>
          <FormControl sx={{marginBottom: '10px'}}>
            <TextField onChange={handleChange}  id="password" variant="outlined" label="Password" name="password" error={error.password}></TextField>
            <FormHelperText error={error.password} sx={{visibility: !error.password ? 'hidden':'visible'}}>Password is Required</FormHelperText>
          </FormControl>
          <Button type='submit' variant="contained" sx={{padding: '15px'}}>LOG IN</Button>
      </Box>
    </Modal>
  )
}

export default Login;