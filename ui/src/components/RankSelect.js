import {  MenuItem, Select } from "@mui/material";

const handleRankSelection = (rank, setRank) => {
    setRank(rank);

}

const RankSelect = ({ setRank }) => {


    return(
        <Select
                            value={0}
                            label="Rank"
                            id="rank-select"
                            onChange={(e) => handleRankSelection(e.target.value, setRank)}
                        >
                            <MenuItem value={0}>E1</MenuItem>
                            <MenuItem value={1}>E2</MenuItem>
                            <MenuItem value={2}>E3</MenuItem>
                            <MenuItem value={3}>E4</MenuItem>
                            <MenuItem value={4}>E5</MenuItem>
                            <MenuItem value={5}>E6</MenuItem>
                            <MenuItem value={6}>E7</MenuItem>
                            <MenuItem value={7}>E8</MenuItem>
                            <MenuItem value={8}>E9</MenuItem>
                            <MenuItem value={9}>O1</MenuItem>
                            <MenuItem value={10}>O2</MenuItem>
                            <MenuItem value={11}>O3</MenuItem>
                            <MenuItem value={12}>O4</MenuItem>
                            <MenuItem value={13}>O5</MenuItem>
                            <MenuItem value={14}>O6</MenuItem>
                            <MenuItem value={15}>O7</MenuItem>
                            <MenuItem value={16}>O8</MenuItem>
                            <MenuItem value={17}>O9</MenuItem>
                            
                            

                        </Select>
    )

}

export default RankSelect;