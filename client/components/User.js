import React from 'react';
import { connect } from 'react-redux';
import store, { updateUser, deleteUser } from '../store';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: this.props.user ? this.props.user.name : '',
        rank: this.props.user ? this.props.user.rank : 0,
        id: this.props.user ? this.props.id : ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  };

  componentWillReceiveProps(nextProps){
    const user = {
      name: nextProps.user ? nextProps.user.name : '',
      rank: nextProps.user ? nextProps.user.rank : 0,
      id: nextProps.user ? nextProps.id : ''
    }
    this.setState({user})
  };

  onChange(ev){
    const props = ev.target.name;
    const user = this.state.user
    user[props] = ev.target.value
    this.setState({user})
  };

  onSubmit(ev){
    ev.preventDefault()
    this.props.updateUser(this.state.user)
  };

  onDelete(ev){
    ev.preventDefault()
    this.props.deleteUser(this.state.user)
  };

  render(){
    const { user } = this.props
    const { name, rank } = this.state.user
    if(!user) {
      return null
    }
    return (
      <div>
        <h1>Edit {user.name}?</h1>
        <br />
        <form className='form-control' onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input className='form-control' name='name' value={name} onChange={this.onChange}/>
          <br />
          <label>Rank: </label>
          <input className='form-control' type='number' name='rank' value={rank} onChange={this.onChange}/>
          <br />
          <button disabled={name.length ? false : true} className='btn btn-secondary btn-block' > Update </button>
          <button className='btn btn-danger btn-block' onClick = {this.onDelete}> Delete </button>
        </form>
      </div>
    )
  };
};

const mapStateToProps = ({ users }, ownProps) => {
  return {
    user: users.find(user => user.id === ownProps.id*1),
    id: ownProps.id
  }
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => dispatch(updateUser(user,history)),
    deleteUser: (user) => dispatch(deleteUser(user,history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);