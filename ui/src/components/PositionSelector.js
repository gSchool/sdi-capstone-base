import {useContext, useState, useEffect} from 'react';
import {  MenuItem, Select, Box, Menu } from "@mui/material";
import axios from "axios";
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;




const PositonSelector = ({ setPosition} ) => {
    const [positionList, setPositionList] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(1);

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        setPosition(position);
    }

    useEffect(() => {
        const getCrewPositions = async () => {
            try {
                let fetchedList = await axios.get(ApiUrl + '/crew_positions');
                setPositionList(fetchedList.data);
                setPosition(1);
            } catch (err) {
                console.log(err);
            }
        }
        getCrewPositions();
        
    }, [])

    useEffect(() => {
        console.log(positionList);
    }, [positionList]);

    if (positionList === null) {
        return (
            <Box>
                <Select
                value={1}
                label="Crew Position"
                id="crew-position-select"
                onChange={(e) => handlePositionSelect(e.target.value)}
                >
                    <MenuItem value={1}>Default</MenuItem>

                </Select>
            </Box>
        )
    }

    return (
        <Box>
            <Select
            value={selectedPosition}
            label="Crew Position"
            id="crew-position-select"
            onChange={(e) => handlePositionSelect(e.target.value)}
            >
                {positionList.map((element, index) => {
                    return (<MenuItem value={element.id}> {element.name}</MenuItem>)
                })}

            </Select>
        </Box>
    )


}

export default PositonSelector;