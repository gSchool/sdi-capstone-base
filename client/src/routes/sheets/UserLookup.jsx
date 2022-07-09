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
import { GlobalContext } from '../../_context/AppProvider'
import smartApi from '../../_helpers/smartApi';
import { UserAccessContext } from '../../_context/UserAccessProvider';

const UserLookup = () => {
  const [ userResults, setUserResults ] = useState([])
  const [ lookupVisible, setLookupVisible ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [ search, setSearch ] = useState('');
  let mouseDownHandler = useScrollHandler('user-scroll-container');

  const { store } = useContext(GlobalContext)
  const { sheet } = useContext(SheetContext);
  const { userAccess } = useContext(UserAccessContext);

  const { user, setSheetAccess, refresh } = store;

  useEffect(() => {
    if (location.pathname.split('/').length >= 5 && location.pathname.split('/')[4] === 'lookup') {
      setLookupVisible(true);
      console.log(location.pathname.split('/')[2])
      if (location.pathname.split('/')[2] === '1001' || location.pathname.split('/')[2] === "1002") {
        setUserResults(dummyData.users)
        mouseDownHandler = useScrollHandler('user-scroll-container');
      } else {

        smartApi(['GET', 'get_all_users/'], user.token)
          .then(result => {
            // console.log(result);
            //fix user id
            result.map(user => user.user_id = user.id)
            setUserResults(result);
            setLookupVisible(true);
          })
          .catch(error => console.log('error', error));

      }
    } else {
      setLookupVisible(false);
    }
  }, [location.pathname])

  useEffect(() => {
    mouseDownHandler = useScrollHandler('user-scroll-container');
  }, [lookupVisible])

  const addUser = (userId, userName) => {
    let threshold = 150 // milliseconds
    let clickDuration = new Date() - sheet.clickTime.current

    if (clickDuration < threshold) {
      console.log(`Attempting to add User ID: ${userId}, Name: ${userName}`)

      let index = userAccess.sheetUsers.findIndex(user => user.user_id === parseInt(userId))

      if (index === -1) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        myHeaders.append('Content-Type', 'application/json')
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
          body: JSON.stringify({users: [{user_id: userId, role_name: 'Viewer'}]})
        };
      
        let sheetId = location.pathname.split('/')[2];
  
        let payload = {users: [{user_id: userId, role_name: 'Viewer'}]}
        smartApi(['POST', `add_user_roles/${sheetId}`, payload], user.token)
          .then(result => {
            toast.success('User Added')

            smartApi(['GET', `get_sheet_users/${sheetId}`], user.token)
            .then(result => {
              userAccess.setSheetUsers(result);
              if (result.length === 0) {
                console.log(result);
                navigate('/')
              }
            })
            .catch(error => console.log('error', error));
          })
          .catch(error => console.log('error', error));
        // fetch(`http://localhost:8080/api/add_user_roles/${sheetId}`, requestOptions)
        //   .then(response => response.json())
        //   .then(result => {
        //     toast.success('User Added')
        //     console.log(result); // user role has been added
        //   })
        //   .catch(error => console.log('error', error));
      } else {
        toast.error('User Already a Member')
      }

    }
  }


  return (
    <>
      {lookupVisible === false ? 
      <div className="user-lookup-container hidden"><div id='user-scroll-container' className='user-lookup-body'></div></div> 
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
            if (user.email === undefined || user.email === null) {
              user.email = `${user.name.split(' ')[0]}.${user.name.split(' ')[1]}@gmail.com`
            }
            if (user.role === undefined) {
              user.role = user.role_name //fix 
            }

            return (
              <div key={userId} className='user-lookup-result'>
                <img src={defaultProfileImage} className='user-lookup-image no-select' alt="profile-image"/>
                <div className='user-lookup-data'>
                  <span className='data-name'>{user.name}</span>
                  <span className='data-email'>{user.email}</span>
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