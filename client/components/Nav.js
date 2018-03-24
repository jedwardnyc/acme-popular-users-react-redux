import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ users, popular }) => {
  
  return (
      <ul className='nav justify-content-center'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>
        </li> 
        <li className='nav-item'>
          <NavLink className='nav-link' to='/users'>
            Users &nbsp;
            <span className='badge badge-primary'>
              {users? users.length : null}
            </span> 
          </NavLink>
        </li> 
        <li className='nav-item'>
          <NavLink className='nav-link' to={users.length ? `/users/${popular.id}` : ''}>
            Most Popular Employee: <span className='badge badge-primary'>
              {users.length ? popular.name : null}
            </span>
          </NavLink>
        </li> 
        <li className='nav-item'>
          <NavLink className='nav-link' to='/users/create'>
            Create a User 
          </NavLink>
        </li> 
      </ul>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users: users.sort((a,b) => (a.rank < b.rank) ? 1 : ((b.rank < a.rank) ? -1 : 0)),
    popular: users.find(user => users.indexOf(user) === 0)
  }
};

export default connect(mapStateToProps)(Nav);