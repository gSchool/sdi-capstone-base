import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
/*
EXAPLANATION FOR THIS COMPONENT IF YOU ARE GOING TO USE IT:

props: {canEdit, val, field, callback}

field: the property name of the value (like "title", "author", "post", etc)
value: the value of that field (like "This Specific Title", "me", "this specific post")
canEdit: true if this is a field you want the user to be able to edit. If it's not editable it will show normal text
callback: Whatever function you get from the useState in the parent component to set the obj being submitted to the server
        on change, that is the callback. It uses the function returned by useState to hook into the state of the parent so 
        whatever is changed in this component can be submitted in the fetch in the parent
        
        (example: I usually use [input, setInput] which is being changed onChange of a form and submitted onSubmit.
            the setInput is what I would pass into this component)

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