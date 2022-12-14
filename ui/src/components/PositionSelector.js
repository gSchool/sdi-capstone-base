import {useState, useEffect} from 'react';
import { MenuItem, Select, Box } from "@mui/material";
import axios from "axios";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const PositonSelector = ({ handleChange, account } ) => {
  const [positionList, setPositionList] = useState(null);

  useEffect(() => {
    const getCrewPositions = async () => {
      try {
        let fetchedList = await axios.get(ApiUrl + '/crew_positions');
        setPositionList(fetchedList.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCrewPositions();
    
  }, [])

  if (positionList === null) {
    return (
      <Box>
        <Select value={1} label="Crew Position" id="crew-position-select">
          <MenuItem value={1}>Default</MenuItem>
        </Select>
      </Box>
    )
  }

  return (
    <Box>
      <Select value={account.crew_position_id} label="Crew Position" id="crew-position-select" onChange={handleChange} name='crew_position_id'>
        {positionList.map((element, index) => {
            return (<MenuItem key={element.id} value={element.id}> {element.name}</MenuItem>)
        })}
      </Select>
    </Box>
  )
}

export default PositonSelector;