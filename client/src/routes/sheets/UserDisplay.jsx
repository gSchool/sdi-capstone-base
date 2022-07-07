import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  useEffect(() => {
    setSheetUsers(dummyData.users);
  })

  return (
    <>
      <div className='users-display-container'>
        <button className='users-display-exit' onClick={
          () => navigate(-1)
        }>X</button>
        <div className='users-display-header'>
          <div className="users-header-meta">
            <img className="users-header-icon" src={logo} />
            <span className="nowrap">User Access</span>
            <button onClick={() => 
            userDisplayView === 'smart' ? setUserDisplayView('simple') : setUserDisplayView('smart')}>
            Toggle View</button>
          </div>
          {/* <div className="users-search">
            <input placeholder='Search'/>
            <button>Filter</button>
          </div> */}
        </div>
        {userDisplayView === 'smart' ? 
          // smart view here
          <div>
            
          </div>
          :
          // simple view here
          <table className='users-table-simple'>
            <thead>
              <tr>
                <td className='users-table-cell'>Name</td>
                <td className='users-table-cell'>Role</td>
              </tr>
            </thead>
            <tbody>
              {sheetUsers.map((user,i) => 
                <tr key={i} className='user-row'>
                  <td>{user.name}</td>
                  <td className='users-table-cell'>
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
