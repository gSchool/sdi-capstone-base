import React, { useContext } from "react";
import { MemberContext } from "./MemberContext";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../styles/MembersDetail.css';


export const MemberDetails = () => {
    const {data} = useContext(MemberContext);


    

    if (!data) {
        return <div>Loading...</div>;
    } else {

  return (
    <div>
      <h1>Member Details</h1>
      <div className='muibox'>
            {data.map((member) => (
            <>
            <Box key={member.id} className='muilist' >
              <Card key={member.id} sx={{ maxWidth: 200, Direction: "row"  }} >
                  <CardActionArea  >               
                      <CardContent key={member.id} >
                          <Typography  key={member.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {member.first_name} {member.last_name} {member.weapon_arming === true ? '🟢' : '🔴'}
                          </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
            </Box>
            </>
            ))}
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