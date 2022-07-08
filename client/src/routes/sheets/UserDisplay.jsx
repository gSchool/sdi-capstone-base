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


const UserDisplay = () => {
  const { sheet } = useContext(SheetContext);
  const [ sheetUsers, setSheetUsers ] = useState([]);
  const [ usersChanged, setUsersChanged] = useState(0);
  const [ userDisplayView, setUserDisplayView ] = useState('simple');
  const mouseDownHandler = useScrollHandler('scroll-container');
  const location = useLocation();
  const navigate = useNavigate();
  let usersToUpdate = useRef([]);
  let sheetId;
  const [ sheetName, setSheetName ] = useState('');

  useEffect(() => {
    // get sheetId
    sheetId = parseInt(location.pathname.split('/')[2]);
    let index = dummySheetAccessData.sheets.findIndex(sheet => sheet.sheet_id === sheetId)
    setSheetName(dummySheetAccessData.sheets[index].name);

    // load user data here
    if (sheetId === 1 || sheetId === 100) {
      setSheetUsers(dummyData.users);
    } else {
      navigate('/')
    }
  })

  const updateUsers = () => {
    for (let element of document.getElementsByClassName('role-changed')) {
      console.log(`Set User ID: ${element.closest('tr').id} to ${element.value}`)
      // updateUsers.push({user_id: element.closest('tr').id, role_name: element.value})
    }

    console.log(usersToUpdate.current)
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
                {sheetUsers.map((user,i) => {
                  let roles = ['Owner', 'Editor', 'Viewer', 'Daniel']
                  return (
                    <tr id={user.user_id} key={i} className='user-row'>
                      <td className='user-row-picture'><img className='user-profile-picture' src={defaultProfileImage} /></td>
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
                      <td className='users-display-cell'>{user.name.split(' ')[0]}.{user.name.split(' ')[1]}@gmail.com</td>
                      <td className='user-row-option'><img alt='delete-icon'/></td>
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
