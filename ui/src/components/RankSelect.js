import {  MenuItem, Select } from "@mui/material";
import {useContext, useState, useEffect} from 'react';

const handleRankSelection = (rank, setRank, setStateRank) => {
    setStateRank(rank);
    setRank(rank);

}

const RankSelect = ({ setRank }) => {
    let [stateRank, setStateRank] = useState('E1');


    return(
        <Select
                            value={stateRank}
                            label="Rank"
                            id="rank-select"
                            onChange={(e) => handleRankSelection(e.target.value, setRank, setStateRank)}
                        >
                            <MenuItem value={'E1'}>E1</MenuItem>
                            <MenuItem value={'E2'}>E2</MenuItem>
                            <MenuItem value={'E3'}>E3</MenuItem>
                            <MenuItem value={'E4'}>E4</MenuItem>
                            <MenuItem value={'E5'}>E5</MenuItem>
                            <MenuItem value={'E6'}>E6</MenuItem>
                            <MenuItem value={'E7'}>E7</MenuItem>
                            <MenuItem value={'E8'}>E8</MenuItem>
                            <MenuItem value={'E9'}>E9</MenuItem>
                            <MenuItem value={'O1'}>O1</MenuItem>
                            <MenuItem value={'O2'}>O2</MenuItem>
                            <MenuItem value={'O3'}>O3</MenuItem>
                            <MenuItem value={'O4'}>O4</MenuItem>
                            <MenuItem value={'O5'}>O5</MenuItem>
                            <MenuItem value={'O6'}>O6</MenuItem>
                            <MenuItem value={'O7'}>O7</MenuItem>
                            <MenuItem value={'O8'}>O8</MenuItem>
                            <MenuItem value={'O9'}>O9</MenuItem>
                            
                            

                        </Select>
    )

}

export default RankSelect;