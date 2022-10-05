import React, {useState} from "react";
//import { MemberContext } from "./MemberContext";
import {Box, Typography, Modal, Button, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Filter = () => {
  //const {API} = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//   const [cert, setCert] = useState(0);
//   const [weapon, setWeapon] = useState(0);
//   const [status, setStatus] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
    };

  return (
      <>
          <Button onClick={handleOpen} variant="outlined" color="secondary" sx={{borderRadius: "30px"}}>Filter</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                <CloseIcon onClick={handleClose} sx={{cursor: "pointer", right: "50%", display: "flex", justifyContent: "right"}} />
                <Typography>Filters</Typography>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">By Certification</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox name="bdoc" />
                        }
                        label="BDOC"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox name="flight chief" />
                        }
                        label="Flight Chief"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox name="ecp" />
                        }
                        label="Entry Control Point"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox name="patrol" />
                        }
                        label="Patrol"
                    />
                    </FormGroup>

                    <FormLabel component="legend">By Weapon Qualification</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox name="m4" />
                        }
                        label="M-4"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox name="m18" />
                        }
                        label="M-18"
                    />
                    </FormGroup>

                    <FormLabel component="legend">Arming Status</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox name="arm" />
                        }
                        label="Can Arm"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox name="no arm" />
                        }
                        label="Cannot Arm"
                    />
                    </FormGroup>
                </FormControl>
                
              </Box>
          </Modal>
      </>
  );
}