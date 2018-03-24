import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  users: [],
  error: '',
};

const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER'; 
const DELETE_USER = 'DELETE_USER';
const ERROR = 'ERROR';

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_USERS:
      return Object.assign({}, state, { users: action.users })
    case CREATE_USER: 
      return Object.assign({}, state, { users: [...state.users, action.user]})
    case UPDATE_USER:
      return Object.assign({}, state, { 
        users: state.users.map(user => user.id ===  action.user.id*1 ? action.user : user) 
      })
    case DELETE_USER: 
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.user.id*1)
      })
    case ERROR: 
      return Object.assign({}, state, { error: action.error })
    default: 
      return state;
  }
};

export const handleErrors = (error) => {
  const _error =  error ? error.response.data.errors[0].message : ''
  return { type: ERROR, error: _error }
}

export const fetchUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch({ type: GET_USERS, users }))
      .catch(err => dispatch(handleErrors(err)))
  };
};

export const createUser = (user, history) => {
  return (dispatch) => {
    return axios.post('/api/users', user)
      .then(res => res.data)
      .then(user => dispatch({ type: CREATE_USER, user }))
      .then(() => history.push('/users'))
      .catch(err => dispatch(handleErrors(err)))
  };
};

export const updateUser = (user, history) => {
  return (dispatch) => {
    return axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(user => dispatch({ type: UPDATE_USER, user }))
      .then(() => history.push('/users'))
      .catch(err => dispatch(handleErrors(err)))
  };
};

export const deleteUser = (user, history) => {
  return (dispatch) => {
    return axios.delete(`/api/users/${user.id}`)
      .then(() => dispatch({ type: DELETE_USER, user }))
      .then(() => history.push('/users'))
      .catch(err => dispatch(handleErrors(err)))
  };
};

export const updateRank = (user) => {
  return (dispatch) => {
    return axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(user => dispatch({ type: UPDATE_USER, user }))
      .catch(err => dispatch(handleErrors(err.message)))
  };
};


const store = createStore(reducer, applyMiddleware(thunk))
export default store;