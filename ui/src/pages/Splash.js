// import '../App.css'
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom";

// import SingleBar from '../components/SingleBar'
// //import { Bar } from "react-chartjs-2"    delete

// const Splash = () => {

//     const navigate = useNavigate();
//     const [list1, setList1] = useState([]);
//     const [list2, setList2] = useState([]);

//     useEffect(() => {
//         genList();
//     }, []);

//     const genList = () => {
//         const list1 = [];
//         const list2 = [];
//         for (let i = 0; i < 5; i++) {
//             list1[i] = Math.random() * 101;
//             list2[i] = Math.random() * 101;
//         }
//         setList1(list1);
//         setList2(list2);
//     };

//     function singleBar(e, color) {
//         const barHeight = 300;
//         const barWidth = 60;
//         const y = barHeight - (barHeight * e) / 100;
//         return (
//             <SingleBar
//                 key={e}
//                 width={barWidth}
//                 height={barHeight}
//                 color={color}
//                 stat={`${Number(e).toFixed(2)} %`}
//                 data={`M 0 ${barHeight} L 0  ${y} L ${barWidth} ${y} l ${barWidth} ${barHeight} Z`}
//             />
//         );
//     }

//     return (
//         <div className='Splash'>
//             <div className='graphGrid'>
//                 <div className='leftGraph'>
//                     <h3>Top Performers</h3>
//                     <div style={{ display: "flex" }}>
//                         {list1.map(e => {
//                             return (singleBar(e, "darkgreen"));
//                         })}
//                     </div>
//                 </div>
//                 <div className='rightGraph'>
//                     <h3>Slackers do not promote</h3>
//                     <div style={{ display: "flex" }}>
//                         {list2.map(e => {
//                             return (singleBar(e, "darkred"));
//                         })}
//                     </div>
//                 </div>
//             </div>
//             <br />
//             <button onClick={genList}>randomize</button>
//             <button onClick={() => navigate('/')}>Continue to Profile</button>
//         </div>
//     )
// }

// export default Splash;