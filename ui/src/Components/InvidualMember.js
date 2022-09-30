import React, { useContext } from "react";
import { MemberContext } from "../Components/MemberContext";
import Box from '@mui/material/Box';
// import  Grid  from "@mui/material/Grid";
import '../styles/Card.css';
// import Avatar from '@mui/material/Avatar';

// import { useNavigate } from 'react-router-dom';




const InvdivdualMember= () => {
  const {member} = useContext(MemberContext);
//   const navigate = useNavigate();

 
    

  

  

 if (member === undefined) {
    <div>loading..</div>

 } else {


  return ( 
            <>
                <Box sx={{m: 20, height: 400, width: 400, boxShadow: 3}}>
                    <h1>hello {member.first_name} {member.last_name} </h1>
                    {console.log(member)}
                </Box>

            </>


    // <Box sx={{ p: 5 }}>
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
    // </Box>
            
            )}
        };

export default InvdivdualMember;