import { Card, CardContent, Typography } from "@mui/material";
import  { useContext, useEffect, useState } from "react";
import axios from "axios";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const dateInfo = (isoDate) => {
  let tempDate = new Date(isoDate);
  let returnInfo;
  //tempDate.getDay() + ', ' + tempDate.getDate() + ', ' + tempDate.getMonth();

  

  

  returnInfo = days[tempDate.getDay()] + ', ' + tempDate.getDate() + ', ' + months[tempDate.getMonth()];

  return returnInfo;
  
}

const ReplacementShift = ({ replacementRequest, crewPositions }) => {
  let test = new Date(replacementRequest.start_datetime);
  console.log('Test Date:', test.getDay());
  

  useEffect(() => {
    
      
      

    
    

  }, [])

  

  return(
    <Card>
      <CardContent>
        <Typography>
          Shift Date: {dateInfo(replacementRequest.start_datetime)}
        </Typography>
        <Typography>
          Shift Crew Position: {crewPositions[replacementRequest.crew_position_id -1].name}
        </Typography>
        <Typography>
          Member needing replacement: {}
        </Typography>
      </CardContent>
    </Card>

  )

}

export default ReplacementShift;