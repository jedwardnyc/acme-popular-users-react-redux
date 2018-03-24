import React from 'react';
import {  connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users';
import User from './User';
import UserCreate from './UserCreate';
import Nav from './Nav';
import Home from './Home';
import store, { fetchUsers } from '../store';

class App extends React.Component {

  componentDidMount(){
    this.props.fetchUsers();
  }

  render(){
    return (
      <div>
      <h1>ACME Company's Leaderboard</h1>
      <Router>
        <div>
        <Nav />
        <br />
          <Route path='/' exact component={ Home } />
          <Route path='/users' exact component={ Users } />
          <Route path='/users/:id' render = {
            ({ match, history }) =>  <User id={match.params.id} history={ history }/> 
          } />
          <Route path='/users/create' component={ UserCreate } />
        </div>
      </Router>
      </div>
    )
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  }
}

export default connect(null, mapDispatchToProps)(App)