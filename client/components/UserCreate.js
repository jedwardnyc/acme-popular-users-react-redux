import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store';

class UserCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: '',
        rank: '',
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(ev){
    const props = ev.target.name;
    const user = this.state.user
    user[props] = ev.target.value
    this.setState({user})
  };

  onSubmit(ev){
    ev.preventDefault()
    this.props.createUser(this.state.user)
  };

  render(){
    const { name, rank } = this.state.user
    return (
      <div>
      <h1> Create a New User </h1>
        <form onSubmit={this.onSubmit}>
          <input name='name' placeholder='Enter a Name' onChange={this.onChange}/>
          <br />
          <input name='rank' placeholder='Enter a Rank' onChange={this.onChange}/>
          <br />
          <button> Create </button>
        </form>
      </div>
    )
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    createUser: (user) => dispatch(createUser(user, history))
  };
};

export default connect(null, mapDispatchToProps)(UserCreate);