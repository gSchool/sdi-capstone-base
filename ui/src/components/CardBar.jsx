import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    }
}));

function CardBar({ title, chart }) {
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

export { CardBar };