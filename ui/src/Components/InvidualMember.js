import React, { useContext, useState } from "react";
import { MemberContext } from "../Components/MemberContext";
import '../styles/Card.css';
import {Box, LinearProgress, Avatar, Button, Typography, Modal, TextField, InputLabel, MenuItem, FormControl, Select} from "@mui/material"
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import TextareaAutosize from '@mui/material/TextareaAutosize';


const InvdivdualMember= () => {
    const {member} = useContext(MemberContext);

    if (member === undefined) {
        return (      
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ) 

    } else {

    return ( 
        <>
            <div><a href="/sfmembers" style={{textDecoration: "none"}}>People&nbsp;</a>{'>'} {member.first_name} {member.last_name}</div>
            <div><Avatar/><h3>{member.first_name} {member.last_name}</h3></div>
            
            <Box sx={{m: 20, height: 400, width: 400, boxShadow: 3}}>
                <p>User Profile</p>
                {/* <Button>Edit Profile</Button>*/}
                <EditMemberModal/>
                <p>Name: {member.first_name} {member.last_name}</p>
                <p>Rank: {member.rank}</p>
                <p>Weapons Qualifications: </p>
                <p>User Type: {member.admin === true ? 'Admin' : 'User'}</p>
                <p>Certifications: {member.cert_id}</p>
                <p>Arm status: {member.weapon_arming === true ? 'Arm 🟢' : 'Do Not Arm🔴'}</p>
                {/* <p>Admin: {member.admin === true ? '🟢' : '🔴'}</p> */}
                <p>Notes: </p>
                {/* {console.log(member)} */}
            </Box>
        </>
        
        )}
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditMemberModal = () => {
    const {API, member} = useContext(MemberContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEdit = () => {
        fetch(`${API}/updateuser/${member.id}`, {
            method: 'PATCH',
            content: JSON.stringify({
                first_name: firstName,
                last_name: lastName
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(window.location.reload(false))
        .then((res) => res.json())
        .catch(err => {
            console.log('Error: ', err);
        });
    };

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" color="secondary">Edit Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose} sx={{textAlign: "right"}}>Close</Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center"}}>
                    Profile
                    </Typography>
                    <Typography id="modal-modal-description" variant="h4" sx={{ mt: 1 , textAlign: "center"}}>
                        Edit Profile
                    </Typography>
                    
                    <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    defaultValue={`${member.first_name}`} 
                    variant="outlined" 
                    onChange={(e) => setFirstName(e.target.value)}/>

                    <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    defaultValue={`${member.last_name}`} 
                    variant="outlined" 
                    onChange={(e) => setLastName(e.target.value)}/>

                    {/* <FormControl fullWidth > */}
                        

                    <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                    <Select
                    htmlFor='weapon_arming'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="User Type"
                    //onChange={handleChange}
                    >
                        <MenuItem value={true}>Admin</MenuItem>
                        <MenuItem value={false}>User</MenuItem>
                    </Select>

                    <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                    <Select
                    htmlFor="rank"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Rank"
                    //onChange={handleChange}
                    >
                        <MenuItem value={null}></MenuItem>
                        <MenuItem value={'AB'}>AB</MenuItem>
                        <MenuItem value={'AMN'}>AMN</MenuItem>
                        <MenuItem value={'A1C'}>A1C</MenuItem>
                        <MenuItem value={'SrA'}>SrA</MenuItem>
                        <MenuItem value={'SSgt'}>SSgt</MenuItem>
                        <MenuItem value={'TSgt'}>TSgt</MenuItem>
                        <MenuItem value={'MSgt'}>MSgt</MenuItem>
                        <MenuItem value={'SMSgt'}>SMSgt</MenuItem>
                        <MenuItem value={"CMSgt"}>CMSgt</MenuItem>
                        <MenuItem value={'1LT'}>1LT</MenuItem>
                        <MenuItem value={'2LT'}>2LT</MenuItem>
                        <MenuItem value={'Capt'}>Capt</MenuItem>
                        <MenuItem value={'Major'}>Major</MenuItem>
                        <MenuItem value={'Lt. Col'}>Lt. Col</MenuItem>
                        <MenuItem value={'Colonel'}>Colonel</MenuItem>
                        
                    </Select>

                    <InputLabel id="demo-simple-select-label">Certifications</InputLabel>
                    <Select
                    htmlFor="cert_id"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Certifications"
                    //onChange={handleChange}
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
                    //value={age}
                    label="Weapon"
                    //onChange={handleChange}
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
                    //value={age}
                    label="Arm"
                    //onChange={handleChange}
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
                    rows={4}/>
                    <Button onClick={() => handleEdit()} color="secondary" variant="contained">Save Profile</Button>
                </Box>
            </Modal>
        </>
    );
}

export default InvdivdualMember;

 {/* // <Box sx={{ p: 5 }}>
    //     <Grid container rowSpacing={8}  sx={{ p: 10 }}>
    //             {data.map((member) => (
    //               <>
    //                 <Box onClick = {() => navigateToMember(member)}
    //                       key={member.first_name} 
    //                       className="card"
    //                       sx={{ width: 200, boxShadow: 3, m:1}}>
    //                       <h4 >
    //                           {member.first_name} {member.last_name} 
    //                           <div >{member.rank}</div> 
    //                       </h4 >
                          
    //                       <div >
    //                           {member.flight}
    //                       </div >
    //                       <div  >
    //                           {member.cert_id}
    //                       </div >
    //                       <div >
    //                           Arming status:{member.weapon_arming === true ? '🟢' : '🔴'}
    //                       </div > 
    //                 </Box>    
    //               </>
    //             ))}
    //     </Grid>
    // </Box> */}