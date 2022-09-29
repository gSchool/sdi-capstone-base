import React, { useContext } from 'react'
import { MemberContext } from './MemberContext';



const Home = () => {
  const {data} = useContext(MemberContext);
  // const [data, setData] = value;

  console.log(data)

  if (data === undefined) {
    return (
      <div>loading..</div>
    )
    } else {
  return (
    <>
    <div> does it work?</div>
   
    {data.map((item) => (
      <>
      <div key={item.first_name}>{item.first_name}</div>
    
      </>
  ))}
  </>
  )}
}
export default Home;