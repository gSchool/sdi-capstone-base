import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "./MemberContext";
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import BasicCard from '../Features/Card';
import {Box, LinearProgress, Button, Typography, Modal, TextField, InputLabel, MenuItem, Select, InputAdornment, Stack, Alert} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { PostCard } from "./PostCard";

export const Settings = () => {
  const {API, triggerFetch} = useContext(MemberContext);
  const [postArray, setPostArray]= useState([])
  const [postsPage, setPostsPage] = useState(true)


  useEffect(() => {
    fetch(`${API}/position`, {
    method: 'GET',
    })
    .then (res => res.json())
    .then (data => setPostArray(data))
    .catch (err => console.log(err))
    
  }, [triggerFetch]);

  useEffect(()=> {
    console.log("post array: ", postArray)
  },[postArray])

  if (postArray.length === 0) {
      return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
  )
      
  } else {

  return (
    <Box>
      <Typography variant="h3" ml={10} pb={4} sx={{fontWeight: "bold"}}>Settings</Typography>
    <Box>
    {postsPage === true ? (<>
        <Typography variant="h7" ml={10} pb={4} onClick={() => setPostsPage(true)} sx={{
        fontWeight: "bold", cursor:"pointer", color: "#BD5334", textDecoration:'underline'
        }}>MANAGE POSTS</Typography>
        <Typography variant="h7" ml={10} pb={4} onClick={() => setPostsPage(false)} sx={{
        fontWeight: "bold", cursor:"pointer"
        }}>MANAGE DESK SERGEANT</Typography>

    </>):(<>
        <Typography variant="h7" ml={10} pb={4} onClick={() => setPostsPage(true)} sx={{
        fontWeight: "bold", cursor:"pointer"
        }}>MANAGE POSTS</Typography>
        <Typography variant="h7" ml={10} pb={4} onClick={() => setPostsPage(false)} sx={{
        fontWeight: "bold", cursor:"pointer", color: "#BD5334", textDecoration:'underline'
        }}>MANAGE DESK SERGEANT</Typography>
    </>)}

    </Box>


{postsPage === true ? (<>
    <Box sx={{mt:10}}>
    <Typography variant="h5" ml={10} pb={4} sx={{}}>{postArray.length} Posts</Typography>
    </Box>

    {postArray.map((post)=>{

        return (<>
            <PostCard post={post}/>
        </>)
    })}

</>):(
<>desk Sergeant page</>

)}




    </Box>
  );
}
};