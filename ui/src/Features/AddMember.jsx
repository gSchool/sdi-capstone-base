import React, { useContext, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
import { Button, Modal, Box, Paper, Typography } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';


const PostMemberModal = props => {
  const { role, post} = props
  const { API, data } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState({userName: ''});

// console.log(data)
let currentDate = new Date().toISOString().split("T")[0]

  const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '50vw',
    height: 'auto',
    minHeight: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000000',
    boxShadow: 24,
    p: 4,
  };

  // post info to post_schedule
  // position id  // post prop
   // user id // from selected user
  // date // schedul filtered
  // time // schedule filtered
  // role // role prop

  return (
    <>
      <Button onClick={() => {
        console.log(role)
        console.log(post)
        setOpen(true)
        }} variant="contained" color="secondary" size="large" sx={{borderRadius: "30px"}}>Add User</Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{overflow:'scroll'}}
      >
        <Box sx={style}>
            <Box sx={{display: "flex", justifyContent: "right"}}>
              <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
            </Box>
            <Typography sx={{textAlign: 'center', fontSize: '2.2rem' }}>Select Qualifying Airman</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{border: '1px solid grey', borderRadius: 3, width: '75%', p: 3 }}>
                {currentDate}<br/>
                Post: {post}<br/>
                {role === 0 && `Shift: Lead`}
                {role === 1 && `Shift: Alpha`}
                {role === 2 && `Shift: Bravo`}
                {role === 3 && `Shift: Charle`}
              </Box>
            </Box>
            
            <Box  sx={{ 
                  display: 'flex', 
                  justifyContent:'center', 
                  flexDirection: 'column', 
                  gap: 1, 
                  mt: 10,
                  px: 5,

                  }}>
              {data.length > 0 ? data.map((user, index) => (
                  <Button 
                    key={index}
                    sx={selected !== user.id ? {borderRadius: 2.5, p: 0} : {borderRadius: 2.5, p: 0, border: '2px solid blue'}}
                    onClick={() => setSelected(user.id)}>
                  <Paper sx={[{
                      display: 'flex',
                      alignItems: 'center',
                      // justifyContent: 'space-around', 
                      flexDirection: 'row',
                      p: 2,
                      width: '100%',
                      borderRadius: 2.5,
                      backgroundColor: 'none'
                      }, {
                      '&:hover': {
                          backgroundColor: '#DCDCDC',
                        } 
                      }
                      ]}>
                    <Box sx={{textAlign: 'left', minWidth: '30%'}}>{`${user.first_name} ${user.last_name}`}</Box>
                    <Box sx={{textAlign: 'center', minWidth: '30%'}}>{`${user.weapons.map(wep => `${wep.weapon} `)}`}</Box>
                    <Box sx={{textAlign: 'left', minWidth: '30%'}}>{`${user.certs[0].cert}`}</Box>
                  </Paper>
                </Button>
              )) : `Loading`}
            </Box>
            <Button onClick={() => {
                console.log('clicked save');
                handleClose();
                console.log(selected);
              }} 
              color="secondary" 
              variant="contained" 
              sx={{ borderRadius: "30px", mt: 5 }}
              >
                ADD TO SCHEDULE
              </Button>
        </Box>
      </Modal>
    </>
      
  )
  
}

export default PostMemberModal