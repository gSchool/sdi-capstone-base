import '../App.css'
// import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { BarChart } from "../components/BarChart";
import { CardBar } from "../components/CardBar";

const Splash2 = () => {
    const navigate = useNavigate();

    const goodBoyData = [
        { name: "Spc1 Timmy", status: "6" },
        { name: "2d Lt Jackson", status: "5" },
        { name: "Spc2 Tommy", status: "4" },
        { name: "1st Lt Johnson", status: "4" },
        { name: "Spc3 Johnny", status: "5" },
        { name: "SSgt Sally", status: "5" },
    ];

    const slackerData = [
        { name: "Spc1 Timmy", status: "6" },
        { name: "2d Lt Jackson", status: "5" },
        { name: "Spc2 Tommy", status: "4" },
        { name: "1st Lt Johnson", status: "4" },
        { name: "Spc3 Johnny", status: "5" },
        { name: "SSgt Sally", status: "5" },
    ];

    return (
        <div className='Splash'>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <CardBar title="Top Performers" chart={<BarChart input={goodBoyData} />} />
                </Grid>
                <Grid item xs={4}>
                    <CardBar title="Slackers do not promote" chart={<BarChart input={slackerData} />} />
                </Grid>
            </Grid>
            <br />
            <button onClick={() => navigate('/')}>Continue to Profile</button>
        </div>
    )
}
// xl={8} lg={8} md={12} sm={12}
export default Splash2;