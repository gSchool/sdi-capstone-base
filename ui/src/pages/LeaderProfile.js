import { Container, Typography } from '@mui/material';
import  { useContext, useEffect, useState } from "react";
import { MenuItem, Select, Box, Grid, Item } from "@mui/material";
import { Context } from '../App';
import axios from "axios";
import '../App.css';
import config from '../config';
import ReplacementShift from '../components/ReplacementShift';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const doubleFilter = (members, shifts) => {
  let tempList;
  console.log('Members Inital:', members);
  console.log('Shifts Inital:', shifts);

  for(let i = 0; i < members.length; i++){
    console.log('Member Iteration');
    for(let j = 0; j < shifts.length; j++){
      // console.log('Shift Iteration');
      // console.log('Member Id: ', members[i].id);
      // console.log('Shift Member Id: ', shifts[j].user_id);
      if(members[i].id === shifts[j].user_id){
        console.log('Members to push:', members[i]);
        tempList.push(members[i]);
      }

    }

  }

  // console.log('Members:', members.length)
  
  return tempList;
}





const LeaderProfile = () => {
  const { user } = useContext(Context);
  let [shiftsNeedingReplacements, setShiftsNeedingReplacements] = useState([]);
  let [crewPositions, setCrewPositions] = useState([]);
  let [membersRequesting, setMembersRequesting] = useState([]);

  useEffect(() => {
    const getShiftsNeedingReplacements = async () =>{
      try{
      let res = await axios.get(ApiUrl + '/time_slots', {withCredentials:true});
      console.log('Response: ', res.data);
      let replacementList = res.data.filter(shift => shift.type === 'replacement_needed');
      setShiftsNeedingReplacements(replacementList);
                


      } catch (e) {
        console.log('Error fetching shifts needing replacement from a leader profile: ', e);

            }

        }
    const getCrewPositions = async () => {
        try{
          let res = await axios.get(ApiUrl + '/crew_positions', {withCredentials:true});
          setCrewPositions(res.data);
          console.log('Crew Positions:', res.data);

        } catch (e) {
            console.log('Error fetching crew member from a leader profile: ', e);
    
        }
    
        }
          getCrewPositions();

        getShiftsNeedingReplacements();
        
    }, []);

    useEffect(() => {
      console.log(shiftsNeedingReplacements);
      

      const getMembersNeedingReplacements = async () => {
        try{
          let res = await axios.get(ApiUrl + '/users?member', {withCredentials:true});
          console.log(res.data);

          // let filteredList = res.data.filter(member => {
          //   if(shiftsNeedingReplacements.indexOf(member.id))
          // })


          
          let memberList = await doubleFilter(res.data, shiftsNeedingReplacements);
          console.log('Member List:', memberList);
          setMembersRequesting(memberList);


        } catch(e){

        }
      }
      getMembersNeedingReplacements();
      console.log('Requesting Members:',membersRequesting);




    }, [shiftsNeedingReplacements]);

    useEffect(() => {
      console.log('Requesting Members:',membersRequesting);


    },[membersRequesting])

    

    return (
      <div className='LeaderProfile'>
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography>Shifts that need to be filled!</Typography>
                  {shiftsNeedingReplacements.map(shift => <ReplacementShift replacementRequest={shift} crewPositions={crewPositions} />)}
                </Box>
              </Grid>
            </Grid>

            
          </Box>
            

        </Container>

        </div>
    )
}

export default LeaderProfile;