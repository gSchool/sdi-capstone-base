import React, { useState, useContext, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material/';
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

export default function CollapsibleTable() {
  const { data, API } = useContext(MemberContext)
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  


  let currentDate = new Date().toISOString().split("T")[0]
  let dateEnd = new Date()
  dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7)).toISOString().split("T")[0];


  console.log('todays date, date end', currentDate, dateEnd);
   

  const fetchPosts = () => {
    console.log('fetching positions')
    fetch(`${API}/position`, {
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
    fetch(`${API}/schedule/date`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({date: currentDate, dateEnd: dateEnd}),
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
    setSelectedDate(currentDate);
  }, [currentDate])

  
  const PostList = (name, man_req, weapon_req, cert_req, users) => {
    let weapons = weapon_req.map(weapon => weapon.weapon )
    weapons = weapons.join(' ')
    let cert = cert_req[0].cert

    return {
      name,
      man_req,
      weapons,
      cert,
      users,
    };
  }

  const rows = useMemo(() => {
    let row = []
    if (positions.length > 0) {
      row = positions.map(position => {
        // figure out personnel position and push to postlist generation
        console.log('selectedDate', selectedDate)

        if (schedule[0] !== undefined) console.log('schedule date', schedule[0].date)
        let filUsers = schedule.filter(sched => sched.position_id === position.id && sched.date.split("T")[0] === selectedDate )
        console.log(position.name)
        while (filUsers.length < position.man_req ) {
          filUsers.push({ noUser: true})
        } 
        console.log('filUsers', filUsers)
        return PostList(position.name, position.man_req, position.weapon_req, position.cert_req, filUsers)
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

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': {  borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={row.users.filter(user => user.noUser === true).length > 0 ? { backgroundColor: "orange"} : {}}>
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
                  {row.users.map((userRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                      {!userRow.noUser && `${userRow.role}`}
                      {userRow.noUser && <Button sx={{ backgroundColor: 'orange' }}>Add User</Button>}
                      </TableCell>
                      <TableCell>
                        {!userRow.noUser && `${userRow.user_info[0].first_name} ${userRow.user_info[0].last_name}`}
                        {userRow.noUser && `No One Posted`}
                      </TableCell>
                      <TableCell align="right">
                        {!userRow.noUser && `${userRow.user_info[0].weapons.map(wep => `${wep.weapon} `)}`}
                        </TableCell>
                      <TableCell align="right">
                      {!userRow.noUser && `${userRow.user_info[0].certs[0].cert}`}
                      
                      </TableCell>   
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