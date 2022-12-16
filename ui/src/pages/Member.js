import { Context } from '../App';
import { useContext, useEffect, useState } from "react"
import { Box, Container, Grid, Typography } from "@mui/material";
import config from '../config'
import { TimeSlot } from '../components/TimeSlot';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Member = () => {
    const { user } = useContext(Context);
    const [timeSlots, setTimeSlots] = useState([]);
    const [replacementTimeSlots, setReplacementTimeSlots] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => {
      setRefresh(!refresh);
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
          console.log(resJson)

          setTimeSlots(resJson);

          res = await fetch(ApiUrl + '/time_slots?need_replacement=true', {
            credentials: 'include'
          });
          resJson = await res.json();
          console.log(resJson)
          if (res.status !== 200) {
            alert(resJson);
          }

          setReplacementTimeSlots(resJson);

        } catch(err) {
          console.log(err);
        }
      }
      if(user !== null) {
        getTimeSlots();
      }
    }, [user, refresh])
    
    return(
        <Container sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-around', marginTop: '20px', textAlign: 'center'}}>
            <Box width={400}>
              <Typography variant='h4' fontWeight='bold' sx={{marginBottom: '20px'}}>
                My Shifts
              </Typography>
              {timeSlots.map(slot => <TimeSlot key={slot.id} slot={slot} toggleRefresh={toggleRefresh}/>)}
            </Box>
            <Box width={400}>
            <Typography variant='h4' fontWeight='bold' sx={{marginBottom: '20px'}}>
                Available Shifts
              </Typography>
              {replacementTimeSlots.map(slot => <TimeSlot key={slot.id} slot={slot} type={"replacement"} toggleRefresh={toggleRefresh}/>)}
            </Box>
        </Container>
    )
}

export default Member;