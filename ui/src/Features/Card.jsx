import React, { useContext, useEffect, useState} from "react";
import { MemberContext } from "../Components/MemberContext";
import {Stack, Box, Checkbox, Typography, Pagination, Button, Chip} from '@mui/material'
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import {Filter} from "../Components/Filter.js"
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


const BasicCard = () => {
  const {data, setMember, API, usersArray, member} = useContext(MemberContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [dataPage, setDataPage] = useState(0);
  const [id, setID] = useState([]);

  //console.log(id);
  const personPerPage = 8;

  const onDataPageChange = (event, page) => setDataPage(page - 1);

  // useEffect(() => {
  //   fetch(`${API}/alluserdata`, {
  //   method: 'GET',
  //   })
  //   .then (res => res.json())
  //   .then (data => setUser(data))
  //   .then(setPage(0))
  //   .catch (err => console.log(err))
  // }, [API, dataPage]);
  // console.log("allusers", user)

  const navigateToMember = (member) => {
    // console.log("current member", member);
    setMember(member) 
    navigate(`/sfmembers/${member.id}`);
  }

  const handleDeleteUser = (id) => {
    fetch(`${API}/deleteuser/${id}`, {
      method: "DELETE",
    })
    .then(window.location.reload(false))
    .then((res) => res.json())
    .catch(err => {
        console.log('Error: ', err);
    });
  }

  return (
    <Box sx={{ boxShadow: 3, mx:10, my:5,  bordorRadius: 3 }}>
      <Box sx={{px:5, py:5}}>
        <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" sx={{display:"flex"}}>
          <Box justifyContent="left" pb={2} sx={{display:"flex"}}>
            <Typography variant="h4">All Users</Typography>
          </Box>
          
          <Box justifyContent="right" sx={{display:"flex"}}>
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

        {/* <Stack>
          {displayPeople}
        </Stack> */}
        <Stack  sx={{py:5}}>
          {usersArray
          // .slice(page * personPerPage, page * personPerPage + personPerPage)
          .map((member, index) => (
              <Stack key={index} 
                className="card"
                direction="row"
                component="span"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                      borderRadius: 3,
                      display:'flex',

                      }}>  
                <Box justifyContent="left" alignItems="center" sx={{display:'flex'}}>
                  <Checkbox label="Name" onChange={() => setID(member.id)}/>                
                  <Typography onClick={() => navigateToMember(member)} sx={
                    {cursor: 'pointer',
                      fontWeight: "bold",
                      color: "blue"
                    }}>
                    {member.last_name}, {member.first_name}
                  </Typography>
                </Box>

                
                <Box justifyContent="center" sx={{display:'flex'}}>
                  <Typography sx={{textAlign: 'center'}}>
                    {/* Cert: {member.cert_id} */}
                    
                    <Chip icon={<WorkspacePremiumIcon />} label={member.certs.map(cert => (cert.cert))} color="success"/>
                  </Typography>
                </Box>

                <Box justifyContent="right" sx={{display:'flex'}}>
                  <Typography sx={{textAlign: 'center'}}>
                  Arming status: &nbsp;{member.weapon_arming === true ? '🟢' : '🔴'}
                  </Typography>
                </Box>

              </Stack>
            
                ))}
        </Stack>
        
        <Box component="span" direction="row" alignItems="center" sx={{display:"flex", justifyContent:"center"}}>
          <Button color ="secondary" variant="contained" size="medium" sx={{borderRadius: "30px" }} onClick={() => handleDeleteUser(id)}>
            Delete User
          </Button>
          <Pagination count={usersArray.length} page={dataPage+1} onChange={onDataPageChange} color="secondary" />
        </Box>
        
      </Box>
    </Box>
    
      
     );
};

export default BasicCard;
        
   
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
    
    
   
    
  

            