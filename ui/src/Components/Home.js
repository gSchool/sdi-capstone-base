import React, { useContext } from 'react'
import { MemberContext } from './MemberContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import PostList from '../Features/PostList';



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
      <h3> {Date()} did eric shave?</h3>
      <div>Panama 12s</div>
      {/* {data.map((item, index) => (
        <div key={index}>
          <div ></div>
        </div>
      ))} */}

      <div>
        <PostList />
      </div>

    </>
  )}
}
export default Home;