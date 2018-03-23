import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ users, popular }) => {
  
  return (
    <div>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <NavLink to='/'>
            Home
          </NavLink>
        </li> &nbsp;
        <li className='nav-item'>
          <NavLink to='/users'>
            Users: 
            <span className='badge badge-pill badge-primary'>
              {users? users.length : null}
            </span> 
          </NavLink>
        </li> &nbsp;
        <li className='nav-item'>
          <NavLink to={users.length ? `/users/${popular.id}` : ''}>
            Most Popular: 
            <span className='badge badge-pill badge-primary'>
              {users.length ? popular.name : null}
            </span> 
          </NavLink>
        </li> &nbsp;
        <li className='nav-item'>
          <NavLink to='/users/create'>
            Create a User 
          </NavLink>
        </li> 
      </ul>
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users,
    popular: users.find(user => users.indexOf(user) === 0)
  }
};

export default connect(mapStateToProps)(Nav);