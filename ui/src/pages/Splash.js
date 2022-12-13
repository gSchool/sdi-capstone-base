import '../App.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import SingleBar from '../components/SingleBar'
//import { Bar } from "react-chartjs-2"    delete

const Splash = () => {
    
    const navigate = useNavigate();
    const barHeight = 300;
    const barWidth = 300;

    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);

    useEffect(() => {
        genList();
    }, []);

    const genList = () => {
        const list = [];
        const list2 = [];
        for (let i = 0; i < 5; i++) {
            list[i] = Math.random() * 101;
            list2[i] = Math.random() * 101;
        }
        setList(list);
        setList2(list2);
    };

    return (
        <div className='Splash'>
            <h3>Top Performers</h3>
            <div style={{ display: "flex" }}>
                {list.map(e => {
                    const y = barHeight - (barHeight * e) / 100;
                    return (
                        <SingleBar
                            key={e}
                            width={barWidth}
                            height={barHeight}
                            color="green"
                            percentage={`${Number(e).toFixed(2)} %`}
                            data={`M 0 ${barHeight} L 0  ${y} L 60 ${y} l 60 ${barHeight} Z`}
                        />
                    );
                })}
            </div>
            <button onClick={genList}>Generate</button>
            <br />
            <button onClick={() => navigate('/')}>Continue to Profile</button>
        </div>
    )
}

export default Splash;