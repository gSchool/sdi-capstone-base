import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "./MemberContext";
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import BasicCard from '../Features/Card';
import {Box, LinearProgress, Button, Typography, Modal, TextField, InputLabel, MenuItem, Select, InputAdornment, Stack, Alert} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export const PostCard = props => {
  const {API, triggerFetch} = useContext(MemberContext);
const post = props.post


  return (
    <Box sx={{mx: 10, mb:5, width: 800, boxShadow: 3, borderRadius: 3, pl: 5, py:5}}>
        <Typography variant="h6" pb={3} onClick={() => setPostsPage(true)} sx={{
        fontWeight: "bold"
        }}>{post.name}</Typography>

<Stack component="span" direction="row" alignItems="center" pt={2} sx={{display:"flex"}}>
          <Box width="33%">
            <Typography sx={{fontWeight: "bold"}}>Role</Typography>
          </Box>
          <Box width="33%">
            <Typography sx={{fontWeight: "bold"}}>Certifications</Typography>
          </Box>
          <Box width="33%">
            <Typography  sx={{fontWeight: "bold"}}>Weapon Qualification</Typography>
          </Box>
        </Stack>

    </Box>

  );
}
