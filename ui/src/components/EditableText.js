import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
/*NOTE: I took some time to learn MUI but I am also still learning so I used this page as a resource for this component:
https://codesandbox.io/s/flamboyant-stonebraker-le1eq?file=/index.js
*/

const EditableText = (props) => {
    let [isEdit, setIsEdit] = useState(false)
    let [value, setValue] = useState(props.val);
    let [typography, setTypography] = useState("") //can set the 
    

    useEffect(()=>{
        setValue(props.val)
        //props.field === "title" ? setTypography('h4') : props.field === "username" ? setTypography("subtitle2") : props.field === "content" ? setTypography ('body1') : setTypography('subtitle2')
    },[props.val])

    let toggleEdit = () =>{
        setIsEdit(!isEdit)
    }


    let handleChange = () => {
        props.callback({
          ...props.input,
          [props.field] : value
        });
    }

    const handleClick = () => {
        toggleEdit()
        handleChange()
    }

    return (
        <Box m={2} p={1}>
            {isEdit ?
                <Grid container spacing={1} direction="column" alignItems="center" justifyContent="space-around">
                    {props.field === 'description' ? 
                        <TextField  defaultValue={props.val} minWith="lg" multiline rows={5} maxRows={5} value={value} onChange={(e) => setValue(e.target.value)}/> 
                        :   
                        <TextField  defaultValue={props.val}  value={value} onChange={(e) => setValue(e.target.value)}/>}
                    <Button size="small" onClick={handleClick}> Done </Button>
                </Grid>
            :
                <Grid container spacing={1} direction="column" alignItems="center" justifyContent="space-evenly">
                    <Typography >{value}</Typography>
                    {props.canEdit ? <Button size="small" onClick={toggleEdit}>Edit</Button> : <></>}
                </Grid>   
            }
    </Box>);
}

export default EditableText