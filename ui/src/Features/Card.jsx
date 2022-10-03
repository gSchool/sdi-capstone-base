import React, { useContext } from "react";
import { MemberContext } from "../Components/MemberContext";
import Box from '@mui/material/Box';
import  Grid  from "@mui/material/Grid";
import Button from '@mui/material/Button';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';




const BasicCard = () => {
  const {data, setMember} = useContext(MemberContext);
  const navigate = useNavigate();

  const navigateToMember = (member) => {
    setMember(member)
    navigate(`/sfmembers/${member.id}`);
    
  }

console.log(data);


  return ( 
    <Box sx={{ p: 5, boxShadow: 3, mx:10, my:5,  bordorRadius: 3 }}>
        <Grid container rowSpacing={8}  sx={{ p: 10}}>
                {data.map((member) => (
                  <>
                    <Box key={member.first_name} 
                          className="card"
                          sx={{ width: 200, 
                                boxShadow: 3,
                                m:1,
                                borderRadius: 3
                                }}>                  
                    

                         
                          <h4 >
                              {member.first_name} {member.last_name} 
                              <div >{member.rank}</div> 
                          </h4 >
                          
                          <a >
                              {member.flight}
                          </a >
                          <div  >
                              {member.cert_id}
                          </div >
                          <div >
                              Arming status:{member.weapon_arming === true ? '🟢' : '🔴'}
                          </div > 
                          <Button color ="secondary" variant="contained" onClick={() => navigateToMember(member)}>View Profile
                    </Button>
                    </Box>
                  </>
                ))}
        </Grid>
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
    
    
   
    
  

            