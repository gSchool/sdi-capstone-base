import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import  { useContext, useEffect, useState } from "react";
import axios from "axios";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const dateInfo = (isoDate) => {
  let tempDate = new Date(isoDate);
  let returnInfo = days[tempDate.getDay()] + ', ' + tempDate.getDate() + ', ' + months[tempDate.getMonth()];
  
  return returnInfo;
}

const returnMemberDetail = (memberID, memberList) => {
  let tempMember = memberList.filter((member) => member.id === memberID);
  if(tempMember[0] === undefined){
    return '_';
  }
  else{
    return(tempMember[0].last_name + ', ' + tempMember[0].first_name + ` (${tempMember[0].rank})` );
  }


  

}

const ReplacementShift = ({ replacementRequest, crewPositions, membersRequesting, memberList, setShift }) => {
  let test = new Date(replacementRequest.start_datetime);
  

  

  useEffect(() => {
    
      
      

    
    

  }, [])

  

  return(
    <Card>
      <CardActionArea onClick={(e) => setShift(replacementRequest)}>
      <CardContent >
        <Typography>
          Shift Date: {dateInfo(replacementRequest.start_datetime)}
        </Typography>
        <Typography>
          {crewPositions[0] === undefined ?
          <Typography>Shift Crew Position:</Typography>
          :
          <Typography> Shift Crew Position: {crewPositions[replacementRequest.crew_position_id -1].name} </Typography>
          }
          
        </Typography>
        <Typography>
          Member needing replacement: {returnMemberDetail(replacementRequest.user_id, memberList)}
        </Typography>
      </CardContent>

      </CardActionArea>
      
    </Card>

  )

}

export default ReplacementShift;