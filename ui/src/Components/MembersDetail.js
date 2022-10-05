import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "./MemberContext";
import '../styles/MembersDetail.css';
import BasicCard from '../Features/Card';
import {Box, LinearProgress, Button, Typography, Modal, TextField, InputLabel, MenuItem, Select, InputAdornment, Stack, Pagination, Alert} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export const MemberDetails = () => {
  const {API, setUsersArray, usersArray, triggerFetch} = useContext(MemberContext);
  const [searchText, setSearchText]= useState('')


  useEffect(() => {
    fetch(`${API}/usersearch/${searchText}`, {
    method: 'GET',
    })
    .then (res => res.json())
    .then (data => setUsersArray(data))
    .catch (err => console.log(err))
    
  }, [searchText, triggerFetch]);

  // useEffect(()=> {
  //   console.log("users array: ", usersArray)
  // },[usersArray])

  if (!usersArray) {
      return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
  )
      
  } else {

  return (
    <Box>
      <Typography variant="h3" ml={10} pb={4} sx={{fontWeight: "bold"}}>People</Typography>
      <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" sx={{display:"flex"}}>
        <Box
        justifyContent="left"
          sx={{
            maxWidth: '100%',
            mx: '80px',
            display:"flex",
          }}
        >
          <TextField label="Search People" id="fullWidth" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
          }}
          onChange={e => {setSearchText(e.target.value)}}
          />
        </Box>
        <Box justifyContent="right" sx={{display:"flex", mx:'80px'}}>
          {/* <Button color ="secondary" variant="contained" size="large">
            Add User
          </Button> */}
          <AddMemberModal/>
        </Box>
      </Stack>

      <Box justifyContent="left" sx={{display:"flex", mx:'80px'}} pt={3}>
        <Button color ="secondary" variant="contained" size="large" sx={{borderRadius: "30px", marginRight: "10px"}}>
          All
        </Button>
        <Button color ="primary" variant="contained" size="large" sx={{borderRadius: "30px", marginRight: "10px"}}>
          User
        </Button>
        <Button color ="primary" variant="contained" size="large" sx={{borderRadius: "30px"}}>
          Admins
        </Button>
      </Box>

      <Stack>
        <BasicCard/>
      </Stack>

      {/* <Stack spacing={2}>
        <Pagination count={10} color="secondary" />
      </Stack> */}
    </Box>
  );
}
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};


const AddMemberModal = () => {
  const {API} = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState();
  const [rank, setRank] = useState("");
  const [cert, setCert] = useState(0);
  const [weapon, setWeapon] = useState(0);
  const [status, setStatus] = useState();
  const [notes, setNotes] = useState("");

  //need to modify this so old data is persisted
  const handleAdd = () => {
      const newUser = {
          first_name: firstName,
          last_name: lastName,
          admin: userType,
          rank: rank,
          cert_id: cert,
          weapon_arming: status,
          notes: notes
      }
      //console.log("updated user, ", updatedUser)
      
      fetch(`${API}/postusers/`, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          }
      })
      .then(<Alert severity="success">This is a success alert — check it out!</Alert>)
      .then(window.location.reload(false))
      .then((res) => res.json())
      .catch(err => {
          console.log('Error: ', err);
      });
  };

  return (
      <>
        <Button onClick={handleOpen} variant="contained" color="secondary" size="large" sx={{borderRadius: "30px"}}>Add User</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <CloseIcon onClick={handleClose} sx={{cursor: "pointer", right: "50%", display: "flex", justifyContent: "right"}} />
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center"}}>
                  People
                  </Typography>
                  <Typography id="modal-modal-description" variant="h4" sx={{ mt: 1 , textAlign: "center", fontWeight: "bold"}}>
                      Add User
                  </Typography>
                  
                  <TextField 
                  id="outlined-basic" 
                  label="First Name" 
                  vaue={firstName}
                  variant="outlined" 
                  onChange={(e) => setFirstName(e.target.value)}/>

                  <TextField 
                  id="outlined-basic" 
                  label="Last Name" 
                  vaue={lastName}
                  variant="outlined" 
                  onChange={(e) => setLastName(e.target.value)}/>

                  {/* <FormControl > */}
                      <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                      <Select
                      htmlFor='weapon_arming'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userType}
                      label="User Type"
                      onChange={(e) => setUserType(e.target.value)}
                      >
                          <MenuItem value={true}>Admin</MenuItem>
                          <MenuItem value={false}>User</MenuItem>
                      </Select>

                      <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                      <Select
                      htmlFor="rank"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rank}
                      label="Rank"
                      onChange={(e) => setRank(e.target.value)}
                      >
                          <MenuItem value={null}></MenuItem>
                          <MenuItem value={'e1'}>AB</MenuItem>
                          <MenuItem value={'e2'}>AMN</MenuItem>
                          <MenuItem value={'e3'}>A1C</MenuItem>
                          <MenuItem value={'e4'}>SrA</MenuItem>
                          <MenuItem value={'e5'}>SSgt</MenuItem>
                          <MenuItem value={'e6'}>TSgt</MenuItem>
                          <MenuItem value={'e7'}>MSgt</MenuItem>
                          <MenuItem value={'e8'}>SMSgt</MenuItem>
                          <MenuItem value={'e9'}>CMSgt</MenuItem>
                          <MenuItem value={'o1'}>1LT</MenuItem>
                          <MenuItem value={'o2'}>2LT</MenuItem>
                          <MenuItem value={'o3'}>Capt</MenuItem>
                          <MenuItem value={'o4'}>Major</MenuItem>
                          <MenuItem value={'o5'}>Lt. Col</MenuItem>
                          <MenuItem value={'o6'}>Colonel</MenuItem>
                          
                      </Select>

                      <InputLabel id="demo-simple-select-label">Certifications</InputLabel>
                      <Select
                      htmlFor="cert_id"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cert}
                      label="Certifications"
                      onChange={(e) => setCert(e.target.value)}
                      >
                          <MenuItem value={null}></MenuItem>
                          <MenuItem value={1}>Entry Controller</MenuItem>
                          <MenuItem value={2}>Patrol</MenuItem>
                          <MenuItem value={3}>Desk Sergeant</MenuItem>
                          <MenuItem value={4}>Flight Sergreant</MenuItem>
                      </Select>

                      <InputLabel id="demo-simple-select-label">Weapon Qualifications</InputLabel>
                      <Select

                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={weapon}
                      label="Weapon"
                      onChange={(e) => setWeapon(e.target.value)}
                      >
                          <MenuItem value={null}></MenuItem>
                          <MenuItem value={1}>M4</MenuItem>
                          <MenuItem value={2}>M18</MenuItem>
                          <MenuItem value={3}>X26P Tazer</MenuItem>
                          <MenuItem value={4}>M249</MenuItem>
                          <MenuItem value={5}>M240</MenuItem>
                          <MenuItem value={6}>M107</MenuItem>
                          <MenuItem value={7}>M320</MenuItem>
                          
                      </Select>

                      <InputLabel id="demo-simple-select-label">Arm Status</InputLabel>
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      marginBottom='5'
                      value={status}
                      label="Arm"
                      onChange={(e) => setStatus(e.target.value)}
                      >
                          <MenuItem value={true}>Arm 🟢</MenuItem>
                          <MenuItem value={false}>Do Not Arm🔴</MenuItem>
                      </Select>
                  {/* </FormControl> */}

                  <TextField 
                  id="outlined-textarea" 
                  label="Notes" 
                  variant="outlined" 
                  fullWidth multiline
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  />
                  
                  <Button onClick={() => handleAdd()} color="secondary" variant="contained">Save Profile</Button>
              </Box>
          </Modal>
      </>
  );
}

