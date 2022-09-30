import React, { useContext } from 'react'
import { MemberContext } from './MemberContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



const Home = () => {
  const {data} = useContext(MemberContext);
  // const [data, setData] = value;

  console.log(data)

  if (data === undefined) {
    return (
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    )
    } else {
  return (
    <>
    <div> does it work</div>
   
    {data.map((item) => (
      <>
      <div key={item.first_name}>{item.first_name}</div>
    
      </>
  ))}
  </>
  )}
}
export default Home;