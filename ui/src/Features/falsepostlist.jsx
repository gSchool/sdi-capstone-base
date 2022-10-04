// // import * as React from 'react';
// import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function PostList(name, manningReq, weaponReq, certs) {

//   return {
//     name,
//     manningReq,
//     weaponReq,
//     certs,
//     history: [
//       {
//         position: 'Lead',
//         userName: 'john',
//         amount: 3,
//       },
//       {
//         position: 'Alpha',
//         userName: 'jane',
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.manningReq}</TableCell>
//         <TableCell align="right">{row.weaponReq}</TableCell>
//         <TableCell align="right">{row.certs}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
                
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Posted</TableCell>
//                     <TableCell>Members</TableCell>
//                     <TableCell align="right">Requried Weapons</TableCell>
//                     <TableCell align="right">Certifications</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.position}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.position}
//                       </TableCell>
//                       <TableCell>{historyRow.userName}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// const rows = [
//   PostList('Golf 1', 2, "M4 M18", "Entry Controller", ),
//   PostList('Golf 2', 2, "M4 M18", "Entry Controller", ),
//   PostList('Golf 3', 2, "M4 M18", "Entry Controller", ),
//   PostList('Security 1', 1, "M4 M18", "Patrol", ),
//   PostList('Security 2', 1, "M4 M18", "Patrol", ),
//   PostList('Security 3', 1, "M4 M18", "Patrol", ),
//   PostList('Security 4', 1, "M4 M18", "Patrol", ),
//   PostList('BDOC', 1, "M4 M18", "Desk Certification", ),
//   PostList('Flight Sargeant', 1, "M4 M18", "Flight Sargeant Certification", ),
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Post</TableCell>
//             <TableCell align="right">Manning Requirements</TableCell>
//             <TableCell align="right">Weapon Requirements</TableCell>
//             <TableCell align="right">Certificates</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }