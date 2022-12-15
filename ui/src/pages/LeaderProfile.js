import { Container, Typography } from '@mui/material';
import  { useContext, useEffect, useState } from "react";
import { MenuItem, Select, Box, Grid, Item } from "@mui/material";
import { Context } from '../App';
import axios from "axios";
import '../App.css';

import ReplacementShift from '../components/ReplacementShift';
import FindReplacement from '../components/modals/FindReplacement';
import Blank from '../components/Blank';
import config from '../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const doubleFilter = async(members, shifts) => {
  let tempList = [];
  

  shifts.forEach((shift) => {
    members.forEach((member) => {
       if(member.id === shift.user_id){
        tempList.push(member);
       }
    })
  })


  
  return tempList;
}





const LeaderProfile = () => {
  const { user } = useContext(Context);
  let [shiftsNeedingReplacements, setShiftsNeedingReplacements] = useState([]);
  let [crewPositions, setCrewPositions] = useState([]);
  let [memberList, setMemberList] = useState([]);
  let [membersRequesting, setMembersRequesting] = useState([]);
  let [shiftSelected, setShiftSelected] = useState(-1);
  let [showFindReplacement, setShowFindReplacement] = useState(false);

  useEffect(() => {
    const getShiftsNeedingReplacements = async () =>{
      try{
      let res = await axios.get(ApiUrl + '/time_slots', {withCredentials:true});
      
      let replacementList = res.data.filter(shift => shift.type === 'replacement_needed');
      setShiftsNeedingReplacements(replacementList);
                


      } catch (e) {
        console.log('Error finding crew positions LeaderProfile:', e);

      }
    }

    const getCrewPositions = async () => {
        try{
          let res = await axios.get(ApiUrl + '/crew_positions', {withCredentials:true});
          setCrewPositions(res.data);


        } catch (e) {
          console.log('Error finding crew positions LeaderProfile:', e);
    
        }
    
        }
          getCrewPositions();

        getShiftsNeedingReplacements();
        
    }, []);

    useEffect(() => {
      console.log('Shift Triggered');
      if(shiftSelected !== -1){
        setShowFindReplacement(true);

      }
      else{
        setShowFindReplacement(false);
      }
      
      


    }, [shiftSelected])


    useEffect(() => {

      const getMembersNeedingReplacements = async () => {
        try{
          let res = await axios.get(ApiUrl + '/users?member', {withCredentials:true});
          setMemberList(res.data);

          let memberList = await doubleFilter(res.data, shiftsNeedingReplacements);
          setMembersRequesting(memberList);

        } catch(e){
          console.log('Error finding members needing replacements in LeaderProfile:', e);

        }
      }
      getMembersNeedingReplacements();



    }, [shiftsNeedingReplacements]);


    return (
      <div className='LeaderProfile'>
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography>Shifts that need to be filled!</Typography>
                  {shiftsNeedingReplacements.map(shift => <ReplacementShift replacementRequest={shift} crewPositions={crewPositions} membersRequesting={membersRequesting} memberList={memberList} setShift={setShiftSelected} />)}

                </Box>
                <Typography>Shifts selected:{shiftSelected.id}</Typography>
              </Grid>
            </Grid>

            
          </Box>
          {showFindReplacement ? <FindReplacement showFindReplacement={setShowFindReplacement} shiftSelected={setShiftSelected}/> : <Blank />}
            

        </Container>

        </div>
    )
}

export default LeaderProfile;