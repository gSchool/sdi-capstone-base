import { Context } from '../App';
import { useContext } from "react"
import MyShifts from '../components/MyShifts';
import { Container, Grid } from '@mui/material';

const Member = () => {
    const { user } = useContext(Context);
    
    return(
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <MyShifts />

                </Grid>
                <Grid item xs={12} lg={6}>
                    <MyShifts />

                </Grid>


            </Grid>

            <p>welcome {user.first_name}</p>
        </Container>
    )
}

export default Member;