import React, { useContext } from "react";
import { MemberContext } from "./MemberContext";
import '../styles/MembersDetail.css';
// import  Grid  from '@mui/material/Grid';
import BasicCard from '../Features/Card';


export const MemberDetails = () => {
    const {data} = useContext(MemberContext);


    

    if (!data) {
        return <div>Loading...</div>;
    } else {

  return (
    <div>
      <h1>Member Details</h1>
      <div>
        
        {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}
          
            <BasicCard key={data.id}/>
          {/* <div>asdfasdfasdf</div> */}
          
        {/* </Grid > */}

        </div>
    </div>
  );
}
};

// Name: {member.first_name} {member.last_name}
// flight:{member.flight}, 
// Arming Status: {member.weapon_arming === true ? '🟢' : '🔴'}



{/* <Card sx={{ minWidth: 275 }}>
<CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    Word of the Day
  </Typography>
  <Typography variant="h5" component="div">
    {member.first_name} {member.last_name}
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    adjective
  </Typography>
  <Typography variant="body2">
    well meaning and kindly.
    <br />
    {'"a benevolent smile"'}
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">Learn More</Button>
</CardActions>
</Card> */}