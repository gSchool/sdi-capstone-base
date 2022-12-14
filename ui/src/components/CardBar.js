import { makeStyles } from "@mui/material";
import { Card, CardContent, Typography, Divider } from "@mui/material";

//note: cannot create variables outside of functions in jsx if importing to js 

export default function CardBar({ title, chart }) {
    const useStyles = makeStyles(() => ({
        header: {
            textTransform: "uppercase"
        }
    }));
    const classes = useStyles();
    return (
        <>
            <Card>
                <CardContent>
                    <Typography className={classes.header} color="textPrimary">
                        {title}
                    </Typography>
                    <Divider />
                    {chart}
                </CardContent>
            </Card>
        </>
    );
}