import { Container, Typography } from '@mui/material';
import  { useContext, useEffect, useState } from "react";
import { MenuItem, Select, Box, Grid, Item } from "@mui/material";
import { Context } from '../App';
import axios from "axios";
import '../App.css';
import config from '../config';
import ReplacementShift from '../components/ReplacementShift';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;



const LeaderProfile = () => {
  const { user } = useContext(Context);
  let [shiftsNeedingReplacements, setShiftsNeedingReplacements] = useState([]);

  useEffect(() => {
    const getShiftsNeedingReplacements = async () =>{
      try{
      let res = await axios.get(ApiUrl + '/time_slots', {withCredentials:true});
      let replacementList = res.filter(shift => shift.type === 'replacement_needed');
                


      } catch (e) {

            }

        }
        getShiftsNeedingReplacements();
        
    }, [])

    

    return (
      <div className='LeaderProfile'>
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography>Shifts that need to be filled!</Typography>
                </Box>
              </Grid>
            </Grid>

              
          </Box>
              

        </Container>

        </div>
    )
}

export default LeaderProfile;