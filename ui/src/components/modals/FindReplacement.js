import { Box, Typography, Button, FormHelperText, Modal, TextField,  FormControl} from "@mui/material";
import { useState } from "react"
import RankSelect from "../RankSelect";
import PositonSelector from "../PositionSelector";
import config from '../../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
};





const FindReplacement = ({ showFindReplacement, shiftSelected }) => {
  let [findReplacementOpen, setFindReplacementOpen] = useState(true);

  const handleFindReplacementClose = () => {
    setFindReplacementOpen(false);
    shiftSelected(-1);
  

  }

  const handleSubmit = () =>{
    
  }


  return(
    <Modal
    open={findReplacementOpen}
    onClose={handleFindReplacementClose}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
      <Typography sx={{textAlign: 'center', marginBottom: '20px'}} variant="h4" fontWeight='bold'>
          Potential Replacement
        </Typography>
        <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginBottom: '10px'}}>
          
          
        </Box> 
       
      </Box>
    </Modal>
  );


}

export default FindReplacement;