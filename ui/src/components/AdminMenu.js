import Container from '@mui/material/Container'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

const AdminMenu = () => {

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginBottom: "0",
        boxShadow: "0 0 10px rgb(10, 31, 10)",
        borderRadius: "5px",
      }}
    >
      <Box m={2} pt={3} pb={3}>
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box m={2} pt={3}>
              <Typography variant="h5">Admin Menu</Typography>
            </Box>
            <Box m={1}>
              <Link to={"/admin/roles"} style={{ textDecoration: 'none', color:"black" }}>
                <Typography variant="h6" >View/Modify Roles</Typography>
              </Link>
            </Box>
            <Box m={1}>
              <Link to={"/admin/orgs"} style={{ textDecoration: 'none', color:"black" }}>
                <Typography variant="h6">View/Modify Organizations</Typography>
              </Link>
            </Box>
          </Grid>
      </Box>
    </Container>
  )
}

export default AdminMenu