import { Context } from '../App';
import { useContext, useEffect, useState } from "react"
import { Box, Button, Card, CardActions, CardContent,  Typography } from "@mui/material";
import config from '../config'
import { TimeSlot } from '../components/TimeSlot';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Member = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([]);
    const [replacementTimeSlots, setReplacementTimeSlots] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [crewPosition, setCrewPosition] = useState(null)

    const toggleRefresh = () => {
      setRefresh(!refresh);
    }

    const shiftOverview = () => {
      navigate('/splash')
    }

    const calendar = () => {
      navigate('/calendar')
    }

    useEffect(() => {
      const getTimeSlots = async () => {
        try {
          let res = await fetch(ApiUrl + '/time_slots', {
            credentials: 'include'
          });
          let resJson = await res.json();

          if (res.status !== 200) {
            alert(resJson);
          }

          resJson = resJson.filter(slot => slot.type === 'shift').sort((a,b) => new Date(a.start_datetime) - new Date(b.start_datetime));

          setTimeSlots(resJson);

          res = await fetch(ApiUrl + '/time_slots?need_replacement=true', {
            credentials: 'include'
          });
          resJson = await res.json();

          if (res.status !== 200) {
            alert(resJson);
          }

          setReplacementTimeSlots(resJson);

          res = await fetch(ApiUrl + `/crew_positions/${user.crew_position_id}`)
          resJson = await res.json();
          setCrewPosition(resJson[0]['name']);
          

        } catch(err) {
          console.log(err);
        }
      }
      if(user !== null) {
        getTimeSlots();
      }
    }, [user, refresh])
    
    return(
        <div style={{display: 'flex', flexDirection: "row", justifyContent: 'space-evenly', marginTop: '20px', textAlign: 'center'}}>
          <Box width={700} sx={{marginTop: '20px'}}>
              <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '20px', bgcolor: '#eeeeee', borderRadius: '20px', padding: '20px'}}>
                <CardContent>
                  <Typography fontSize={150} sx={{marginBottom: '-50px'}}><AccountCircle fontSize='inherit'/></Typography>
                  <Typography variant='h3'>{user ? user.first_name + " " + user.last_name : null}</Typography>
                  <Typography variant="h6">Crew Position: {crewPosition}</Typography>
                  <hr/>
                  <Typography variant="h6">Account Info: </Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Typography><span style={{fontWeight: 'bold'}}>Rank:</span> {user ? user.rank : null}</Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Role:</span> {user ? user.role : null}</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Typography><span style={{fontWeight: 'bold'}}>Email:</span> {user ? user.email : null}</Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Phone Number:</span>{user ? user.phone_number : null}</Typography>
                  </Box>
                  <hr/>
                </CardContent>
                <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <Button size="small" variant='contained' onClick={shiftOverview}>See Shift Overview</Button> :
                  <Button size="small" variant='contained' onClick={calendar}>See Calendar</Button>
                </CardActions>
              </Card>
            </Box>
            <Box width={replacementTimeSlots.length > 0 ? 400: 800}>
              <Typography variant='h4' fontWeight='bold' sx={{marginBottom: '20px'}}>
                My Shifts
              </Typography>
              <Box sx={replacementTimeSlots.length > 0 ? null : {display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {timeSlots.map(slot => <TimeSlot key={slot.id} slot={slot} toggleRefresh={toggleRefresh}/>)}
              </Box>
              
            </Box>
            {replacementTimeSlots.length > 0 ?
              (
                <Box width={400}>
                  <Typography variant='h4' fontWeight='bold' sx={{marginBottom: '20px'}}>
                    Available Shifts
                  </Typography>
                  {replacementTimeSlots.map(slot => <TimeSlot key={slot.id} slot={slot} type={"replacement"} toggleRefresh={toggleRefresh}/>)}
                </Box>
              ) : null}
            
        </div>
    )
}

export default Member;