import React, { useContext, useEffect } from "react";
import { MemberContext } from "../Components/MemberContext";
import {Stack, Box, Checkbox, Typography} from '@mui/material'
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import {Filter} from "../Components/Filter.js"


const BasicCard = () => {
  const {data, setMember, setUser, API} = useContext(MemberContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/alluserdata`, {
    method: 'GET',
    })
    .then (res => res.json())
    .then (data => setUser(data))
    .catch (err => console.log(err))
    
  }, [API]);

  //console.log("allusers", user)

  const navigateToMember = (member) => {
    // console.log("current member", member);
    setMember(member) 
    navigate(`/sfmembers/${member.id}`);
  }

  
  return ( 
    <Box sx={{ boxShadow: 3, mx:10, my:5,  bordorRadius: 3 }}>
      <Box sx={{px:5, py:5}}>
        <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" sx={{display:"flex"}}>
          <Box justifyContent="left" sx={{display:"flex"}}>
          <h2>All Users</h2>
          </Box>
          
          <Box justifyContent="right" sx={{display:"flex"}}>
            {/* <Button color ="secondary" variant="outlined" size="large">
              Filter
            </Button> */}
            <Filter/>
          </Box>
        </Stack>

        <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" sx={{display:"flex"}}>
          <Box>
            <Typography sx={{fontWeight: "bold"}}>Name</Typography>
          </Box>
          <Box>
            <Typography sx={{fontWeight: "bold"}}>Certifications</Typography>
          </Box>
          <Box>
            <Typography sx={{fontWeight: "bold"}}>Weapon Qualification</Typography>
          </Box>
        </Stack>

        <Stack container rowSpacing={8}  sx={{py:5}}>
          {data.map((member) => (
            <>
              <Stack key={member.first_name} 
                className="card"
                direction="row"
                component="span"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                      boxShadow: 3,
                      borderRadius: 3,
                      display:'flex',

                      }}>  
                <Box justifyContent="left" alignItems="center" sx={{display:'flex'}}>
                            <Checkbox label="Name"/>                
                            <Typography onClick={() => navigateToMember(member)} sx={
                              {cursor: 'pointer',
                                fontWeight: "bold",
                                color: "blue"
                              }}>
                              {member.last_name}, {member.first_name}
                            </Typography>
                </Box>

                
                

                <Box justifyContent="center" sx={{display:'flex'}}>
                {/* <a>
                  {member.flight}
                </a > */}
                <Typography sx={{textAlign: 'center'}}>
                  Cert: {member.cert_id}
                </Typography>

                </Box>

                <Box justifyContent="right" sx={{display:'flex'}}>
                {/* <a>
                  {member.flight}
                </a > */}
                <Typography sx={{textAlign: 'center'}}>
                Arming status: &nbsp;{member.weapon_arming === true ? '🟢' : '🔴'}
                </Typography>

                </Box>

              </Stack>
            </>
                ))}
        </Stack>
      </Box>
    </Box>
    
    
      
   
        
   
// Card sx={{ minWidth: 275 }}>
        
        
//           <CardContent>
//             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//               {item.first_name} {item.last_name}: {item.rank}
//             </Typography>
//             <Typography variant="h5" component="div">
//               {item.flight}
//             </Typography>
//             <Typography sx={{ mb: 1.5 }} color="text.secondary">
//               {item.cert_id}
//             </Typography>
//             <Typography variant="body2">
//               Arming status:{item.weapon_arming === true ? '🟢' : '🔴'}
              
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Admin: {item.admin}</Button>
//           </CardActions>
//       </Card>   
















  );
};

export default BasicCard;
    
    // {data.map((member) => (
    //         <>
    //         <Grid
    //           container
    //           direction="row"
    //           justifyContent="flex-start"
    //           alignItems="center"
    //         >
    //           <Card key={member.id} sx={{ maxWidth: 200, Direction: "row"  }} >
    //               <CardActionArea  >               
    //                   <CardContent key={member.id} >
    //                       <Typography  key={member.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                           {member.first_name} {member.last_name} {member.weapon_arming === true ? '🟢' : '🔴'}
    //                       </Typography>
    //                   </CardContent>
    //               </CardActionArea>
    //           </Card>
    //         </Grid>
    //         </>
    //         ))} 
    
    
   
    
  

            