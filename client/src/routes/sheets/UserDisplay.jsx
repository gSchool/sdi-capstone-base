import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SheetContext } from '../../_context/SheetProvider';
import { Div } from '../../_styles/_global'
import logo from '../../_assets/img/logo-dark.png';
import dummyData from '../../_dummy/users.json';
import edit from '../../_assets/icons/edit-purple.png'
import useScrollHandler from '../../_helpers/useScrollHandler';
import '../../_styles/userdisplay.css';
import defaultProfileImage from '../../_assets/img/default-profile-img.png';
import plus from '../../_assets/icons/plus.png';
import dummySheetAccessData from '../../_dummy/sheet-access.json';
import UserLookup from './UserLookup';
import { GlobalContext } from '../../_context/AppProvider'
import smartApi from '../../_helpers/smartApi';
import toast from 'react-hot-toast'
import { UserAccessContext } from '../../_context/UserAccessProvider';

const UserDisplay = () => {
  const { store } = useContext(GlobalContext)
  const { sheet } = useContext(SheetContext);
  const { userAccess } = useContext(UserAccessContext);

  const [ usersChanged, setUsersChanged] = useState(0);
  const [ userDisplayView, setUserDisplayView ] = useState('simple');
  const mouseDownHandler = useScrollHandler('scroll-container');
  const location = useLocation();
  const navigate = useNavigate();
  let usersToUpdate = useRef([]);
  let sheetId;
  const [ sheetName, setSheetName ] = useState('');

  const { user, setSheetAccess, refresh } = store;

  useEffect(()=> {
    // console.log('Use Effect Triggered')
  }, [userAccess.sheetUsers])

  useEffect(() => {
    // get sheetId
    sheetId = parseInt(location.pathname.split('/')[2]);

    // load user data here
    if (sheetId === 1001 || sheetId === 1002) {
      let index = dummySheetAccessData.sheets.findIndex(sheet => sheet.sheet_id === sheetId)
      setSheetName(dummySheetAccessData.sheets[index].name);
      userAccess.setSheetUsers(dummyData.users);
    } else {

    
      smartApi(['GET', `get_sheet_users/${sheetId}`], user.token)
        .then(result => {
          userAccess.setSheetUsers(result);
          if (result.length === 0) {
            console.log(result);
            navigate('/')
          }
        })
        .catch(error => console.log('error', error));

      // navigate('/')
    }
  },[])

  const getSheetUsers = () => {
    sheetId = parseInt(location.pathname.split('/')[2]);
    smartApi(['GET', `get_sheet_users/${sheetId}`], user.token)
      .then(result => {
        userAccess.setSheetUsers(result);
        if (result.length === 0) {
          console.log(result);
          navigate('/')
        } else {
          navigate(location.pathname);
        }
      })
      .catch(error => console.log('error', error));
  }

  const updateUsers = () => {
    let payload = {users: []}
    for (let element of document.getElementsByClassName('role-changed')) {
      console.log(`Set User ID: ${element.closest('tr').id} to ${element.value}`)
      // let payload = {users: [{user_id: userId, role_name: 'Viewer'}]}
      payload.users.push({user_id: element.closest('tr').id, "role_name": element.value})
    }
    setUsersChanged(0)
    let sheetId = location.pathname.split('/')[2];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.token}`);
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(payload)
    };
  
    fetch(`http://localhost:8080/api/edit_user_roles/${sheetId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        toast.success('Users Roles Updated!')
        console.log(result); // user role has been added
        getSheetUsers();
        // window.location.reload();
      })
      .catch(error => console.log('error', error));

    // smartApi(['PATCH', `edit_user_roles/${sheetId}`, payload], user.token)
    //   .then(result => {
    //     // toast.success('Users Roles Updated!')
    //     console.log(result); 
    //   })
    //   .catch(error => console.log('error', error));

    console.log(payload)
  }



  const deleteUser = (target) => {
    let payload = {users: [target]}

    let sheetId = location.pathname.split('/')[2];

    smartApi(['DELETE', `remove_roles/${sheetId}`, payload], user.token)
      .then(result => {
        toast.success('User Removed')
        console.log(result); 
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <div className={`users-display-container ${location.pathname.split('/').length >= 5 && location.pathname.split('/')[4] === 'lookup' ? 'shrink' : ''}`}>
        <div className='users-display-header'>
          <div className="users-header-meta">
            <div className="users-header-icon">
              <img />
            </div>
            <div className='users-header-title'>
              <span className="page-name nowrap">User Access</span>
              <span className={`sheet-name ${sheetName === '' ? 'filler':''} nowrap`}>{sheetName === '' ? 'Loading...': sheetName}</span>
            </div>
          </div>
          <div className="users-search">
            {/* <input placeholder='Search'/> */}
            {usersChanged <= 0 ? 
              <button className='update-disabled' disabled>Update</button> 
              : 
              <button className='update-enabled' onClick={updateUsers}>Update</button>}
          </div>
        </div>
        <div id='scroll-container' className='users-display-body' onMouseDown={(e) => {
          sheet.clickTime.current = new Date();
          mouseDownHandler(e);
          }}>
          {userDisplayView === 'smart' ? 
            // smart view here
            <div>
              Wow!
            </div>
            :
            // simple view here
            <table className='users-display-table'>
              <thead>
                <tr>
                  <td className='users-display-cell'></td>
                  <td className='users-display-cell'>Name</td>
                  <td className='users-display-cell'>Role</td>
                  <td className='users-display-cell'>E-Mail</td>
                  <td className='users-display-cell'></td>
                </tr>
              </thead>
              <tbody>
                {userAccess.sheetUsers.map((user,i) => {
                  let roles = ['Owner', 'Editor', 'Viewer', 'Daniel']

                  if (user.email === undefined || user.email === null) {
                    user.email = `${user.name.split(' ')[0]}.${user.name.split(' ')[1]}@gmail.com`
                  }
                  if (user.role === undefined) {
                    user.role = user.role_name //fix 
                  }
                  return (
                    <tr id={user.user_id} key={i} className='user-row'>
                      <td className='user-row-picture'><img className='user-profile-picture' src={user.picture !== undefined ? user.picture : defaultProfileImage} /></td>
                      <td className='users-display-cell'>{user.name}</td>
                      <td className='users-display-cell'>
                        <select defaultValue={user.role} className='users-display-role-select' onChange={(e) => {
                          if (e.target.value !== user.role) {
                            if (!e.target.classList.contains('role-changed')) {
                              e.target.classList.add('role-changed')
                              setUsersChanged(usersChanged + 1)
                              usersToUpdate.current.push({user_id: user.user_id, role_name: e.target.value})
                            }
                          } else {
                            if (e.target.classList.contains('role-changed')) {
                              e.target.classList.remove('role-changed')
                              setUsersChanged(usersChanged - 1)
                              let index = usersToUpdate.current.findIndex(user => user.user_id === user.id)
                              usersToUpdate.current.splice(index, 1);
                            }
                          }
                        }}>
                          {roles.map(role => 
                            <option key={`option-${role}`} className={`${role === user.role ? 'previous-value' : 'other-value'}`}value={role}>{role}</option>)}
                        </select>
                      </td>
                      <td className='users-display-cell'>
                        {user.email}
                      </td>
                      <td className='user-row-option'>
                        <img alt='delete-icon' onClick={() => {deleteUser(user)}}/>
                      </td>
                    </tr>
                  )}
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
      <UserLookup/>
      <button className='add-user' onClick={() => navigate('lookup')}><img className='primary-image'/><img className='secondary-image'/></button>
      <button className='users-display-exit' onClick={
          () => navigate(-1)
        }>&lt;</button>
      {/* <button className='toggle-view' onClick={() => 
      userDisplayView === 'smart' ? setUserDisplayView('simple') : setUserDisplayView('smart')}><img /></button> */}
    </>
  );
}

export default UserDisplay;
//sidebar

//header
//fields
//entries

//detailed
