import { createStore, applyMiddleware } from 'redux';

const initialState = {
  users: []
};

const GET_USERS = 'GET_USERS';

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_USERS:
      return Object.assign({}, state, { users: action.users })
  }
};

export function getUsers(users){
  const action = { type: GET_USERS, users };
  return action;
};


const store = createStore(reducer)
export default store;