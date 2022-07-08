import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import edit from '../../_assets/icons/edit-purple.png'
import Loader from '../../_components/Loader';
import { Div } from '../../_styles/_global'
import { ReactComponent as Check } from '../../_assets/icons/checkmark.svg';
import toast from 'react-hot-toast'
import dummyData from '../../_dummy/users.json';
import '../../_styles/user-lookup.css';
import defaultProfileImage from '../../_assets/img/default-profile-img.png';
import useScrollHandler from '../../_helpers/useScrollHandler';
import { SheetContext } from '../../_context/SheetProvider';

const UserLookup = () => {
  const [ userResults, setUserResults ] = useState([])
  const [ isVisible, setIsVisible ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [ search, setSearch ] = useState('');
  let mouseDownHandler;
  const { sheet } = useContext(SheetContext);

  useEffect(() => {
    if (location.pathname.split('/').length >= 5 && location.pathname.split('/')[4] === 'lookup') {
      mouseDownHandler = useScrollHandler('user-scroll-container');
      setIsVisible(true);
      setUserResults(dummyData.users)
    } else {
      setIsVisible(false);
    }

  }, [location.pathname])

  useEffect(() => {
    mouseDownHandler = useScrollHandler('user-scroll-container');
  }, [isVisible])

  const addUser = (userId, userName) => {
    let threshold = 150 // milliseconds
    let clickDuration = new Date() - sheet.clickTime.current

    if (clickDuration < threshold) {
      toast.success('User Added')
      console.log(`Add User ID: ${userId}, Name: ${userName}`)
    }
  }

  return (
    <>
      {isVisible === false ? 
      <div className="user-lookup-container hidden"></div> 
      : 
      <div className="user-lookup-container">
        <div className='user-lookup-header no-select'>
          <span>User Lookup</span>
          <button className="user-lookup-cancel cancel-desktop" onClick={() => {
              navigate(`/sheet/${location.pathname.split('/')[2]}/users`)
              setUserResults([])
            }}>&gt;</button>
            <button className="user-lookup-cancel cancel-mobile" onClick={() => {
              navigate(`/sheet/${location.pathname.split('/')[2]}/users`)
              setUserResults([])
            }}>x</button>

        </div>
        <div className='user-lookup-search'>
          <div className='user-lookup-input'>
            <input placeholder='Search' onChange={(e) => setSearch(e.target.value)}></input>
            {/* <img /> */}
          </div>
          <div className='user-search-line'/>
        </div>
        <div id='user-scroll-container' className='user-lookup-body' onMouseDown={(e) => {
          sheet.clickTime.current = new Date();
          mouseDownHandler(e);
          }}>
          {userResults.filter(user => //change one of these to email once we have that data
            (user.name.match(new RegExp(search,'i','g')) || user.name.match(new RegExp(search,'i','g')))
            ).map(user => {
            let userId = user.user_id;
            let userName = user.name;
            return (
              <div key={userId} className='user-lookup-result'>
                <img src={defaultProfileImage} className='user-lookup-image no-select' alt="profile-image"/>
                <div className='user-lookup-data'>
                  <span className='data-name'>{user.name}</span>
                  <span className='data-email'>{user.name.split(' ')[0]}.{user.name.split(' ')[1]}@gmail.com</span>
                </div>
                <button onClick={() => addUser(userId, userName)} className='user-search-add no-select'>+</button>
              </div>
            );
          })}
        </div>
      </div>
      }
    </>
  )
}

export default UserLookup;