import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

/*
scroll container for comments?
*/

const dummyComments = [
  { id: 1, parent_id: 5, body: "a comment", user_id: 1, timestamp: "now" },
  { id: 2, parent_id: 1, body: "a comment", user_id: 1, timestamp: "now" },
  { id: 5, parent_id: null, body: "a comment", user_id: 1, timestamp: "now" }
]

const dummyOwners = [
  { rank: "Lt", name: 'I dont know' },
  { rank: "Lt", name: 'I dont know' }
]
const dummy = { id: 1, title: "no u", description: "got em", assigned_date: "a year ago", suspense_date: "now", completed_date: "n/a", status: "In Progress", owner: dummyOwners, created_by_rank: "Spc3", created_by_name: "Lauren Enders", comments: dummyComments } //desription or body?

const TaskDetails = () => {

  /*
      Since the data is likely going to be a state, and i dont know if the Array.sort(), which sorts an array in place, is going
      to change the state so I'm assuming we will have a "comments" state variable that we can sort and render
  */

  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }


  const sortComments = () => {
    let commentArray = dummyComments //maybe have to do a deep copy?
    commentArray.sort(compare);
    return commentArray
  }

  //have this be inside useEffect, handle the same way as sorting for Project 3!!!
  let sortedComments = sortComments()

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Typography>{`Title: ${dummy.title}`}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Priority: ${dummy.priority}`}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Status: ${dummy.status}`}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Assigned Date: ${dummy.assigned_date}`}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Suspense Date: ${dummy.suspense_date}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`Description: ${dummy.description}`}</Typography>
            </Grid>
        </Grid>
      </Container>
      <Container>
    
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            {
              sortedComments.map((comment) => {
                return (
                  <>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user_id}</h4>
                        <p style={{ textAlign: "left" }}>{comment.body}</p>
                        <p style={{ textAlign: "left", color: "gray" }}>{comment.timestamp}</p>
                      </Grid>
                    </Grid>
                  </>
                )
              })
            }
          </Paper>

      </Container>
      </Box>
    </>
  )
}

export default TaskDetails
