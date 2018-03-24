import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, updateRank } from '../store';
import { NavLink } from 'react-router-dom';

class Users extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      users: this.props.users,
      rank: 0
    }
    this.add = this.add.bind(this)
  }

  add(user){
    user.rank++
    this.props.updateRank(user)
  }

  subtract(user){
    user.rank--
    this.props.updateRank(user)
  }

  render(){
    return(
      <ul className='list-group'>
        {
          this.props.users.map(user => (
            <li className='list-group-item' key={user.id}>
              <NavLink to={`/users/${user.id}`}> 
                {user.name}
              </NavLink>
              <br />
              <button onClick={()=>this.subtract(user)}> - </button>
                &nbsp;{user.rank}&nbsp;
              <button onClick={()=>this.add(user)}> + </button>
            </li>
          ))
        }
      </ul>
    )
  } 
};


const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateRank: (user) => dispatch(updateRank(user))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Users);