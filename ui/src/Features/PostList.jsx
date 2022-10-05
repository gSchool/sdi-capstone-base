import React, { useState, useContext, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
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

  // name,
  //     man_req,
  //     weapons,
  //     cert,

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
        <TableCell align="right">{row.man_req}</TableCell>
        <TableCell align="right">{row.weapons}</TableCell>
        <TableCell align="right">{row.cert}</TableCell>
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
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
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
  const { data, api } = useContext(MemberContext)
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  


  let currentDate = new Date()
  currentDate = { 
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  }
  // console.log('todays date', currentDate);
  
  let dateInfo = currentDate
  if (dateInfo.day <= 9 ){
    dateInfo.day = `0${dateInfo.day}`
  }
  dateInfo = `${currentDate.year}-${currentDate.month}-${currentDate.day}T00:00:00.000Z`
  

  const fetchPosts = () => {
    console.log('fetching positions')
    fetch(`${api}/position`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then(res => {
       // console.log(res.status);
       return res.json();
    })
    .then(data => {
      // console.log(data);
      setPositions(data)
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  const fetchSchedule = () => {
    console.log('fetching schedule')
    fetch(`${api}/schedule/date`, {
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
      // console.log(data);
      setSchedule(data);
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  useEffect(() => {
    fetchSchedule()
    fetchPosts()
    setSelectedDate(dateInfo);
  }, [dateInfo])

  
  const PostList = (name, man_req, weapon_req, cert_req, users) => {
    let weapons = weapon_req.map(weapon => weapon.weapon )
    weapons = weapons.join(' ')
    let cert = cert_req[0].cert

    return {
      name,
      man_req,
      weapons,
      cert,
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

  const rows = useMemo(() => {
    let row = []
    if (positions.length > 0) {
      row = positions.map(position => {
        // figure out personnel position and push to postlist generation
        console.log('selectedDate', selectedDate)
        console.log('schedule date', schedule[0].date)
        let filSched = schedule.filter(sched => sched.position_id === position.id && sched.date === selectedDate )
        console.log('filSched', filSched)
        
        // make post table row
        return PostList(position.name, position.man_req, position.weapon_req, position.cert_req)
      })
    }
    return row
  }, [positions])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Post</TableCell>
            <TableCell align="right">Manning Requirements</TableCell>
            <TableCell align="right">Weapon Requirements</TableCell>
            <TableCell align="right">Certification Required</TableCell>
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