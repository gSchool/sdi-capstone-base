import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Context } from '../App';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

export const TimeSlot = ({ slot, type, toggleRefresh }) => {
  const { user } = useContext(Context);
  const start = new Date(slot.start_datetime.replace(' ', 'T'));
  const end = new Date(slot.end_datetime.replace(' ', 'T'));

  const handlePickUp = () => {
    const pickUp = async () => {
      try {
        const res = await fetch(ApiUrl + `/time_slots/${slot.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({type: 'shift', user_id: user.id}),
        })
        const resJson = await res.json();
  
        if (res.status !== 201) {
          alert(resJson)
          return;
        }

        toggleRefresh();
      } catch(err) {
        console.log(err);
      }
    }
    pickUp();
  }

  const handleReplacement = () => {
    const replace = async () => {
      try {
        const res = await fetch(ApiUrl + `/time_slots/${slot.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({type: 'replacement_needed', user_id: user.id}),
        })
        const resJson = await res.json();
  
        if (res.status !== 201) {
          alert(resJson)
          return;
        }
        toggleRefresh();
      } catch(err) {
        console.log(err);
      }
    }
    replace();
  }

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '30px', bgcolor: '#eeeeee', borderRadius: '5px',  padding: '20px', width: '340px'}}>
      <CardContent>
        <Typography variant="h6" sx={{marginBottom: '20px'}} fontWeight='bold'>{start.toDateString().slice(4, 10)}: {start.toTimeString().slice(0,5)} - {end.toTimeString().slice(0,5)}</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography><span style={{fontWeight: 'bold'}}>Crew Position:</span> {slot.name} </Typography>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Typography><span style={{fontWeight: 'bold'}}>Description:</span> {slot.description} </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        { type === 'replacement' ?
          <Button size="small" variant='contained' onClick={handlePickUp}>Pick Up Shift</Button> :
          <Button size="small" variant='contained' color="secondary" onClick={handleReplacement}>I Can't Make It</Button>
        }
        
        
      </CardActions>
    </Card>
    
  )
}
