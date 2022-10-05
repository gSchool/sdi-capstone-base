import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MemberContext } from '../Components/MemberContext';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.manningReq}</TableCell>
        <TableCell align="right">{row.weaponReq}</TableCell>
        <TableCell align="right">{row.certs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Posted</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell align="right">Requried Weapons</TableCell>
                    <TableCell align="right">Certifications</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.users.map((userRow) => (
                    <TableRow key={userRow.position}>
                      <TableCell component="th" scope="row">
                        {userRow.position}
                      </TableCell>
                      <TableCell>{userRow.userName}</TableCell>
                      <TableCell align="right">{userRow.weapons}</TableCell>
                      <TableCell align="right">{userRow.certifications}</TableCell>   
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { data, API } = useContext(MemberContext)
  let currentDate = new Date()

  currentDate = { 
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  }
  console.log(currentDate);

  const fetchSchedule = () => {
    console.log('fetching schedule')
    fetch(`${API}/schedule/date`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(currentDate),
    })
      .then(res => {
       // console.log(res.status);
       return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  useEffect(() => {
    fetchSchedule()
  }, [])
  
  const PostList = (name, manningReq, weaponReq, certs, users) => {
    return {
      name,
      manningReq,
      weaponReq,
      certs,
      users: [
        {
          position: 'Lead',
          userName: 'john',
          weapons: 3,
          certifications: 'test',
        },
        {
          position: 'Alpha',
          userName: 'jane',
          weapons: 1,
          certifications: 'test',
        },
      ],
    };
  }

  // generate rows with information passes to create an obj to map for subtables
  const rows = [
    PostList('Golf 1', 2, "M4 M18", "Entry Controller", 'users'),
    PostList('Golf 2', 2, "M4 M18", "Entry Controller", ),
    PostList('Golf 3', 2, "M4 M18", "Entry Controller", ),
    PostList('Security 1', 1, "M4 M18", "Patrol", ),
    PostList('Security 2', 1, "M4 M18", "Patrol", ),
    PostList('Security 3', 1, "M4 M18", "Patrol", ),
    PostList('Security 4', 1, "M4 M18", "Patrol", ),
    PostList('BDOC', 1, "M4 M18", "Desk Certification", ),
    PostList('Flight Sargeant', 1, "M4 M18", "Flight Sargeant Certification", ),
  ];


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Post</TableCell>
            <TableCell align="right">Manning Requirements</TableCell>
            <TableCell align="right">Weapon Requirements</TableCell>
            <TableCell align="right">Certificates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}