import React, { useContext, useEffect, useState} from "react";
import { MemberContext } from "../Components/MemberContext";
import {Stack, Box, Checkbox, Typography, Pagination, Button, Chip, TablePagination} from '@mui/material'
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import {Filter} from "../Components/Filter.js"
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';


const UserCard = () => {
  const {setMember, API, usersArray, setTriggerFetch, triggerFetch} = useContext(MemberContext);
  const navigate = useNavigate();
  const [idArray, setIdArray] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
  }, []);

  const onDataPageChange = (event, page) => setPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    fetch(`${API}/alluserdata`, {
    method: 'GET',
    })
    .then (res => res.json())
    .then(setPage(0))
    .catch (err => console.log(err))
  }, [API, triggerFetch]);
  //console.log("allusers", user)

  const navigateToMember = (member) => {
    console.log("current member", member);
    setMember(member) 
    navigate(`/sfmembers/${member.id}`);
  }

  const handleDeleteUser = (inputArray) => {
    for(let userId of inputArray){
      fetch(`${API}/deleteuser/${userId}`, {
        method: "DELETE",
      })
      // .then(window.location.reload(false))
      .then((res) => res.json())
      .then(() => {
          setTriggerFetch(curr => !curr)
          //navigate("/sfmembers")
          // handleClose()
        })
      .then(navigate("/sfmembers"))
      .catch(err => {
          console.log('Error: ', err);
      });
    }
  }

  useEffect(()=>{console.log(idArray)},[idArray])

  return (
    <Box sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3 }}>
      <Box sx={{ px: 5, py: 5 }}>
        <Stack
          component="span"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ display: "flex" }}
        >
          <Box justifyContent="left" pb={2} sx={{ display: "flex" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Users
            </Typography>
          </Box>

          <Box justifyContent="right" sx={{ display: "flex" }}>
            <Filter />
          </Box>
        </Stack>

        <Stack
          component="span"
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          pt={2}
          sx={{ display: "flex" }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Rank</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Role</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              Certifications
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              Weapon Qualification
            </Typography>
          </Box>
        </Stack>

        <Stack container rowSpacing={8} sx={{ py: 5 }}>
          {usersArray
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((member, index) => (
              member.admin === false ? (
              <Stack
                key={index}
                className="card"
                direction="row"
                component="span"
                alignItems="center"
                sx={{
                  borderRadius: 3,
                  display: "flex",
                }}
              >
                <Box
                  justifyContent="left"
                  width="5%"
                  alignItems="center"
                  sx={{ display: "flex" }}
                >
                  <Checkbox
                    label="Name"
                    onChange={() => {
                      setIdArray((curr) => [...curr, member.id]);
                    }}
                  />
                </Box>

                <Box
                  justifyContent="left"
                  width="35%"
                  alignItems="center"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>{member.rank.toUpperCase()}</Typography>
                  <Typography
                    onClick={() => navigateToMember(member)}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    {member.last_name}, {member.first_name}
                  </Typography>
                  {member.admin === true ? (
                    <Typography>Admin</Typography>
                  ) : (
                    <Typography>User</Typography>
                  )}
                </Box>

                <Box
                  justifyContent="right"
                  width="30%"
                  sx={{ display: "flex" }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {member.certs.length === 0 ? (
                      <Chip
                        icon={<WorkspacePremiumIcon />}
                        label="No Certs"
                        color="success"
                      />
                    ) : (
                      <Chip
                        icon={<WorkspacePremiumIcon />}
                        label={member.certs.map((cert) => cert.cert)}
                        color="success"
                      />
                    )}
                  </Typography>
                </Box>

                <Box
                  justifyContent="right"
                  width="30%"
                  sx={{ display: "flex" }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {member.weapons.length === 0 ? (
                      <Chip
                        color="secondary"
                        icon={<SecurityIcon />}
                        label="No Weapons"
                      />
                    ) : (
                      member.weapons.map((weapon) => (
                        <Chip
                          icon={<SecurityIcon />}
                          label={weapon.weapon.toUpperCase()}
                          color="secondary"
                        />
                      ))
                    )}
                    {/* <Chip icon={<SecurityIcon />} label={member.weapons.map(weapon => (weapon.weapon))} color="secondary"/> */}
                  </Typography>
                </Box>
              </Stack> ) : null
            ))}
        </Stack>

        <Stack
          component="span"
          direction="row"
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              color="secondary"
              variant="contained"
              size="medium"
              sx={{ borderRadius: "30px" }}
              onClick={() => handleDeleteUser(idArray)}
            >
              Delete User
            </Button>
          </Box>

          <Box>
            <Pagination
              count={Math.ceil(usersArray.length / rowsPerPage)}
              onChange={onDataPageChange}
              page={page + 1}
              color="secondary"
            />
          </Box>

          <Box>
            {/* <Checkbox></Checkbox> */}
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={usersArray.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCard;   