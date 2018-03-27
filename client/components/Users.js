import React from 'react';
import { connect } from 'react-redux';
import { updateRank } from '../store';
import { NavLink } from 'react-router-dom';

const Users = (props) => { 

  return(
    <ul className='list-group'>
      {
        props.users.map(user => (
          <li className='list-group-item' key={user.id}>
            <NavLink to={`/users/${user.id}`}> 
              {user.name}
            </NavLink>
            <br />
            <br />
            <button className='btn btn-outline-secondary btn-sm' onClick={()=>props.subtract(user)}> - </button>
              &nbsp;{user.rank}&nbsp;
            <button className='btn btn-outline-secondary btn-sm' onClick={()=>props.add(user)}> + </button> 
          </li>
        ))
      }
    </ul>
  )

};

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    subtract: (user) => {
      user.rank--
      return dispatch(updateRank(user))
    },
    add: (user) => {
      user.rank++
      return dispatch(updateRank(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);