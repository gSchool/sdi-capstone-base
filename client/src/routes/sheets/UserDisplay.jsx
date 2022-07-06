import React, { useState, useEffect, useContext } from 'react';
import { SheetContext } from '../../_context/SheetProvider';
import { Div } from '../../_styles/_global'
import logo from '../../_assets/img/logo-dark.png';
import dummyData from '../../_dummy/users.json';
import edit from '../../_assets/icons/edit-purple.png'

import '../../_styles/userdisplay.css';

const UserDisplay = () => {
  const { sheet } = useContext(SheetContext);
  const [ sheetUsers, setSheetUsers ] = useState([]);
  const [ userDisplayView, setUserDisplayView ] = useState('simple');

  useEffect(() => {
    setSheetUsers(dummyData.users);
  })

  return (
    <>
      <div className='users-display-container'>
        <button className='users-display-exit' onClick={() => sheet.setSheetPageView('sheet')}>X</button>
        <div className='users-display-header'>
          <div className="users-header-meta">
            <img className="users-header-icon" src={logo} />
            <span className="nowrap">User Access</span>
          </div>
          <button onClick={() => 
            userDisplayView === 'fancy' ? setUserDisplayView('simple') : setUserDisplayView('fancy')}>
            Toggle View</button>
          {/* <div className="users-search">
            <input placeholder='Search'/>
            <button>Filter</button>
          </div> */}
        </div>
        {userDisplayView === 'fancy' ? 
          // fancy view here
          <div>

          </div>
          :
          // normal view here
          <table className='users-table-simple'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Role</td>
              </tr>
            </thead>
            <tbody>
              {sheetUsers.map((user,i) => 
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>
                    {user.role}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    </>
  );
}

export default UserDisplay;
//sidebar

//header
//fields
//entries

//detailed
