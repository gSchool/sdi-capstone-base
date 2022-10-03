import React, { useContext } from "react";
import { MemberContext } from "./MemberContext";
import '../styles/MembersDetail.css';
import BasicCard from '../Features/Card';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const MemberDetails = () => {
    const {data} = useContext(MemberContext);


    if (!data) {
        return (
        <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    )
        
    } else {

  return (
    <div>

      <h1>People</h1>
    <Box
      sx={{
        // width: 800,
        maxWidth: '100%',
        mx: '80px',
      }}
    >
      <TextField Search People label="Search People" id="fullWidth" />
      <Button variant="contained" size="large">
          Add User
        </Button>
    </Box>



      {/* <h1>Security Forces Members</h1> */}
        <div>
          <BasicCard key={data.id}/>
        </div>
    </div>
  );
}
};

