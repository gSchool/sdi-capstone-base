import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import config from "../config";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewModifyRoles = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    let url = `${ApiUrl}/users`
    fetch(url)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <Box width={"90%"} margin="auto" marginTop={5}>
      <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
      <Typography align="center" variant="h4">View/Modify Roles</Typography>
      <Paper style={{ padding: "40px 20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> User Id </TableCell>
                <TableCell align="right"> Name </TableCell>
                <TableCell align="right"> Rank </TableCell>
                <TableCell align="right"> Organization Id </TableCell>
                <TableCell align="right"> Organization Name </TableCell>
                <TableCell align="right"> Email </TableCell>
                <TableCell align="right"> Position Id </TableCell>
                <TableCell align="right"> Position Name </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.user_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.user_id}
                  </TableCell>
                  <TableCell align="right">{user.user_name}</TableCell>
                  <TableCell align="right">{user.user_rank}</TableCell>
                  <TableCell align="right">{user.org_id}</TableCell>
                  <TableCell align="right">{user.org_name}</TableCell>
                  <TableCell align="right">{user.user_email}</TableCell>
                  <TableCell align="right">{user.position_id}</TableCell>
                  <TableCell align="right">{user.position_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </Grid>
    </Box>
  )
}

export default ViewModifyRoles

/*
    "user_id": 1,
    "user_name": "Jeff Haddock",
    "user_rank": "CIV",
    "org_id": 1,
    "org_name": "21 CS",
    "user_email": "jeff.haddock@gmail.com",
    "position_id": 1,
    "position_name": "member"

        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
*/