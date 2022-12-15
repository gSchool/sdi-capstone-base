import { Paper, Container, Box, Typography, Button, Stack, Modal, TextField, Alert, FormControl } from "@mui/material";
import { useState, useEffect, useContext } from "react"
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from '../../App';
import config from '../../config'
import { ConstructionOutlined } from "@mui/icons-material";
import Blank from "../Blank";
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
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

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
    let res = await fetch(ApiUrl + '/login', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
      
    res = await res.json();
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
        <FormControl variant='filled'>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="username" variant="outlined" label="Username" name="username" required></TextField>
          <TextField onChange={handleChange} sx={{marginBottom: '20px'}} id="password" variant="outlined" label="Password" name="password" required></TextField>
          <Button type='submit' variant="contained" sx={{padding: '15px'}}>LOG IN</Button>
        </FormControl>
      </Box>
    </Modal>
  )
}

export default Login;