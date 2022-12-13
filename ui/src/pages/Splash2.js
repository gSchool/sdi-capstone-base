import '../App.css'
// import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, ValueAxis, Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui';

const Splash2 = () => {
    const navigate = useNavigate();

    const data = [
        { argument: 'Monday', value: 1 },
        { argument: 'Tuesday', value: 2 },
        { argument: 'Wednesday', value: 3 },
        { argument: 'Thursday', value: 4 },
        { argument: 'Friday', value: 5 },
    ];

    return (
        <div className='Splash'>
            <br />
            <h3>Top Performers</h3>
            <Paper>
                <Chart data={data}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="value" argumentField="argument" />
                </Chart>
            </Paper>
            {/* <div className='graphGrid'>
                <div className='leftGraph'>
                    <h3>Top Performers</h3>
                    <div style={{ display: "flex" }}>
                        <Paper>
                            <Chart data={data}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </Paper>
                    </div>
                </div>
                <div className='rightGraph'>
                    <h3>Slackers do not promote</h3>
                    <div style={{ display: "flex" }}>

                    </div>
                </div>
            </div> */}
            <br />
            <button onClick={() => navigate('/')}>Continue to Profile</button>
        </div>
    )
}

export default Splash2;