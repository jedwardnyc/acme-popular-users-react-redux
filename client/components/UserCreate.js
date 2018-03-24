import React from 'react';
import { connect } from 'react-redux';
import { createUser, handleErrors } from '../store';

class UserCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        name: '',
        rank: 0,
      },
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
      <div className='form-group'>
      <h1> Create a New User </h1>
      <br />
        <form className='form-control' onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input className={`form-control ${this.props.error ? 'error' : ''}`} name='name' placeholder='Enter a Name' onChange={this.onChange}/>
          {
            this.props.error ? 
            <div id="error-message" className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Oh no!</strong> {this.props.error}
              <button 
                onClick={()=> {
                  this.props.handleErrors('')
                }} 
                className="close" data-dismiss="alert">
                <span> &times; </span>
              </button>
            </div> : null 
          }
          <br />
          <label>Rank: </label>
          <input className='form-control' type='number' name='rank' defaultValue='0' onChange={this.onChange}/>
          <br />
          <button disabled={name.length ? false : true} className='btn btn-secondary btn-lg btn-block'> Create </button>
        </form>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    createUser: (user) => dispatch(createUser(user, history)),
    handleErrors: (error) => dispatch(handleErrors(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);